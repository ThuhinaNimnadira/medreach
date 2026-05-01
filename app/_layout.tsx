import React, { useState, useEffect } from "react";
import { Stack, router } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navReady, setNavReady] = useState(false); 
  useEffect(() => {
    const t = setTimeout(() => {
      setIsLoggedIn(false); 
      setLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

 
  useEffect(() => {
    if (!loading) {
    
      const navTimer = requestAnimationFrame(() => setNavReady(true));
      return () => cancelAnimationFrame(navTimer);
    }
  }, [loading]);

  
  useEffect(() => {
    if (navReady && !isLoggedIn) {
      router.replace("/login");
    }
  }, [navReady, isLoggedIn]);

 
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
