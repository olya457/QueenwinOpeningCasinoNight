import React, {createContext, useContext, useMemo, useState} from 'react';

type RequestPayload = {
  kind: 'event' | 'service' | 'parking' | 'order';
  title: string;
  subtitle?: string;
};

type AppContextValue = {
  onboardingCompleted: boolean;
  completeOnboarding: () => void;
  savedEventIds: string[];
  toggleSavedEvent: (id: string) => void;
  savedOfferIds: string[];
  toggleSavedOffer: (id: string) => void;
  cart: Record<string, number>;
  addToCart: (id: string, amount?: number) => void;
  updateCartItem: (id: string, amount: number) => void;
  clearCart: () => void;
  brightnessEnabled: boolean;
  toggleBrightness: () => void;
  selectedParkingId: string | null;
  setSelectedParkingId: (id: string | null) => void;
  lastRequest: RequestPayload | null;
  submitRequest: (payload: RequestPayload) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({children}: {children: React.ReactNode}) {
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [savedEventIds, setSavedEventIds] = useState<string[]>([]);
  const [savedOfferIds, setSavedOfferIds] = useState<string[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [brightnessEnabled, setBrightnessEnabled] = useState(false);
  const [selectedParkingId, setSelectedParkingId] = useState<string | null>('A01');
  const [lastRequest, setLastRequest] = useState<RequestPayload | null>(null);

  const value = useMemo<AppContextValue>(
    () => ({
      onboardingCompleted,
      completeOnboarding: () => setOnboardingCompleted(true),
      savedEventIds,
      toggleSavedEvent: id =>
        setSavedEventIds(current =>
          current.includes(id) ? current.filter(item => item !== id) : [...current, id],
        ),
      savedOfferIds,
      toggleSavedOffer: id =>
        setSavedOfferIds(current =>
          current.includes(id) ? current.filter(item => item !== id) : [...current, id],
        ),
      cart,
      addToCart: (id, amount = 1) =>
        setCart(current => ({...current, [id]: (current[id] || 0) + amount})),
      updateCartItem: (id, amount) =>
        setCart(current => {
          if (amount <= 0) {
            const next = {...current};
            delete next[id];
            return next;
          }
          return {...current, [id]: amount};
        }),
      clearCart: () => setCart({}),
      brightnessEnabled,
      toggleBrightness: () => setBrightnessEnabled(current => !current),
      selectedParkingId,
      setSelectedParkingId,
      lastRequest,
      submitRequest: payload => setLastRequest(payload),
    }),
    [brightnessEnabled, cart, lastRequest, onboardingCompleted, savedEventIds, savedOfferIds, selectedParkingId],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within AppProvider');
  }
  return context;
}
