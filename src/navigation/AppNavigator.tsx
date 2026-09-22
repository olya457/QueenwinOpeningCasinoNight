import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, Image, ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WebView} from 'react-native-webview';
import {BackgroundScreen} from '../components/ui';
import {images} from '../assets';
import {colors} from '../constants/theme';
import {useAppState} from '../store/AppContext';
import {OnboardingScreen} from '../screens/onboarding/OnboardingScreen';
import {PassHomeScreen, FullPassScreen, EntryRulesScreen, GuestHelpScreen} from '../screens/pass';
import {EventsScreen, SavedEventsScreen, EventDetailsScreen, EventRequestScreen, EventRequestSuccessScreen} from '../screens/events';
import {MenuScreen, MenuItemScreen, OrderRequestScreen, OrderSuccessScreen} from '../screens/menu';
import {ServicesScreen, ServiceRequestScreen, ServiceSuccessScreen, ParkingRequestScreen, ParkingSuccessScreen} from '../screens/services';
import {OffersScreen, SavedOffersScreen, OfferDetailsScreen} from '../screens/offers';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const PassStack = createNativeStackNavigator();
const EventsStack = createNativeStackNavigator();
const MenuStack = createNativeStackNavigator();
const ServicesStack = createNativeStackNavigator();
const OffersStack = createNativeStackNavigator();

function SplashScreen({onDone}: {onDone: () => void}) {
  const startedAt = useRef(Date.now()).current;
  const progress = useRef(new Animated.Value(0.08)).current;
  const [webviewReady, setWebviewReady] = useState(false);
  const [layout, setLayout] = useState(Dimensions.get('window'));
  const background = Image.resolveAssetSource(images.loaderBackground);
  const imageHeight = background.height * Math.max(layout.width / background.width, layout.height / background.height);
  // Follow the subtitle in the artwork, including the crop from resizeMode="cover".
  const loaderTop = (layout.height - imageHeight) / 2 + imageHeight * 0.56 + 20;

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: false,
    });
    animation.start();
    return () => animation.stop();
  }, [progress]);

  useEffect(() => {
    const timer = setTimeout(onDone, 5000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <ImageBackground
      source={images.loaderBackground}
      resizeMode="cover"
      style={styles.splashScreen}
      onLayout={({nativeEvent}) => setLayout(previous => ({...previous, ...nativeEvent.layout}))}>
      <View pointerEvents="none" style={[styles.splashContent, {top: loaderTop}]}>
        <View style={styles.webviewWrap}>
          {!webviewReady && (
            <View style={styles.loaderTrack}>
              <Animated.View style={[styles.loaderFill, {width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              })}]} />
            </View>
          )}
          <WebView
            originWhitelist={['*']}
            scrollEnabled={false}
            bounces={false}
            overScrollMode="never"
            onMessage={({nativeEvent}) => {
              if (nativeEvent.data === 'loader-ready') {
                setWebviewReady(true);
              }
            }}
            source={{
              html: `<!DOCTYPE html><html><head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
                <style>
                  html,body{margin:0;width:100%;height:100%;background:transparent;overflow:hidden}
                  body{display:flex;align-items:center;justify-content:center}
                  .track{width:100%;height:5px;border-radius:999px;overflow:hidden;background:rgba(44,245,155,.3)}
                  .fill{width:100%;height:100%;border-radius:inherit;background:linear-gradient(90deg,#169b72,#2cf59b);transform:scaleX(.08);transform-origin:left;animation:fill 4s linear forwards}
                  @keyframes fill{to{transform:scaleX(1)}}
                </style>
              </head><body><div class="track"><div class="fill"></div></div>
                <script>
                  document.querySelector('.fill').style.animationDelay = '-' + Math.max(0, Date.now() - ${startedAt}) + 'ms';
                  requestAnimationFrame(function(){requestAnimationFrame(function(){window.ReactNativeWebView.postMessage('loader-ready');});});
                </script>
              </body></html>`,
            }}
            containerStyle={[styles.webviewContainer, {opacity: webviewReady ? 1 : 0}]}
            style={styles.webview}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

function FloatingTabBar({state, descriptors, navigation}: any) {
  return (
    <View style={styles.tabShell}>
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const {options} = descriptors[route.key];

          return (
            <Pressable key={route.key} onPress={() => navigation.navigate(route.name)} style={styles.tabItem}>
              <Text style={[styles.tabEmoji, isFocused && styles.tabEmojiActive]}>
                {options.tabBarIcon?.({focused: isFocused, color: '', size: 0})}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function stackOptions(title?: string) {
  return {
    headerShown: true,
    headerTransparent: false,
    headerTitle: title || '',
    headerTintColor: colors.accent,
    headerBackTitleVisible: false,
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: colors.background,
    },
    headerTitleStyle: {
      color: colors.text,
      fontWeight: '700' as const,
    },
    contentStyle: {backgroundColor: colors.background},
  };
}

function PassStackScreen() {
  return (
    <PassStack.Navigator>
      <PassStack.Screen name="PassHome" component={PassHomeScreen} options={{headerShown: false}} />
      <PassStack.Screen name="FullPass" component={FullPassScreen} options={stackOptions('Full Pass')} />
      <PassStack.Screen name="EntryRules" component={EntryRulesScreen} options={stackOptions('Entry Rules')} />
      <PassStack.Screen name="GuestHelp" component={GuestHelpScreen} options={stackOptions('Guest Help')} />
    </PassStack.Navigator>
  );
}

function EventsStackScreen() {
  return (
    <EventsStack.Navigator>
      <EventsStack.Screen name="EventsHome" component={EventsScreen} options={{headerShown: false}} />
      <EventsStack.Screen name="SavedEvents" component={SavedEventsScreen} options={stackOptions('Saved Events')} />
      <EventsStack.Screen name="EventDetails" component={EventDetailsScreen} options={stackOptions('Event Details')} />
      <EventsStack.Screen name="EventRequest" component={EventRequestScreen} options={stackOptions('Send Request')} />
      <EventsStack.Screen name="EventRequestSuccess" component={EventRequestSuccessScreen} options={stackOptions('')} />
    </EventsStack.Navigator>
  );
}

function MenuStackScreen() {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="MenuHome" component={MenuScreen} options={{headerShown: false}} />
      <MenuStack.Screen name="MenuItem" component={MenuItemScreen} options={stackOptions('')} />
      <MenuStack.Screen name="OrderRequest" component={OrderRequestScreen} options={stackOptions('Order Request')} />
      <MenuStack.Screen name="OrderSuccess" component={OrderSuccessScreen} options={stackOptions('')} />
    </MenuStack.Navigator>
  );
}

function ServicesStackScreen() {
  return (
    <ServicesStack.Navigator>
      <ServicesStack.Screen name="ServicesHome" component={ServicesScreen} options={{headerShown: false}} />
      <ServicesStack.Screen name="ServiceRequest" component={ServiceRequestScreen} options={stackOptions('Service Request')} />
      <ServicesStack.Screen name="ServiceSuccess" component={ServiceSuccessScreen} options={stackOptions('')} />
      <ServicesStack.Screen name="ParkingRequest" component={ParkingRequestScreen} options={stackOptions('Parking Request')} />
      <ServicesStack.Screen name="ParkingSuccess" component={ParkingSuccessScreen} options={stackOptions('')} />
    </ServicesStack.Navigator>
  );
}

function OffersStackScreen() {
  return (
    <OffersStack.Navigator>
      <OffersStack.Screen name="OffersHome" component={OffersScreen} options={{headerShown: false}} />
      <OffersStack.Screen name="SavedOffers" component={SavedOffersScreen} options={stackOptions('Saved Offers')} />
      <OffersStack.Screen name="OfferDetails" component={OfferDetailsScreen} options={stackOptions('')} />
    </OffersStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} tabBar={props => <FloatingTabBar {...props} />}>
      <Tab.Screen name="Pass" component={PassStackScreen} options={{tabBarIcon: () => '🎫'}} />
      <Tab.Screen name="Events" component={EventsStackScreen} options={{tabBarIcon: () => '🗓️'}} />
      <Tab.Screen name="Menu" component={MenuStackScreen} options={{tabBarIcon: () => '🍽️'}} />
      <Tab.Screen name="Services" component={ServicesStackScreen} options={{tabBarIcon: () => '🛎️'}} />
      <Tab.Screen name="Offers" component={OffersStackScreen} options={{tabBarIcon: () => '⭐'}} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const {onboardingCompleted} = useAppState();
  const [splashDone, setSplashDone] = useState(false);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {!splashDone ? (
          <RootStack.Screen name="Splash">
            {() => <SplashScreen onDone={() => setSplashDone(true)} />}
          </RootStack.Screen>
        ) : !onboardingCompleted ? (
          <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <RootStack.Screen name="Main" component={MainTabs} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  splashContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  webviewWrap: {
    width: 220,
    maxWidth: '70%',
    height: 16,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  webview: {
    flex: 0,
    width: '100%',
    height: 16,
    backgroundColor: 'transparent',
  },
  webviewContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 0,
    backgroundColor: 'transparent',
  },
  loaderTrack: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 5.5,
    height: 5,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: 'rgba(44,245,155,.3)',
  },
  loaderFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#2cf59b',
  },
  tabShell: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 30,
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    width: Math.min(Dimensions.get('window').width - 32, 360),
    justifyContent: 'space-between',
    backgroundColor: 'rgba(10,15,28,0.96)',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(120,140,172,0.18)',
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 24,
    shadowOffset: {width: 0, height: 12},
    elevation: 10,
  },
  tabItem: {
    width: 52,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabEmoji: {
    fontSize: 22,
    opacity: 0.5,
  },
  tabEmojiActive: {
    opacity: 1,
  },
});
