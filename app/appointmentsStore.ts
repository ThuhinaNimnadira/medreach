  
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Appointment = {
  id: string;
  doctorName: string;
  specialization: string;
  dateTime: string; // e.g. "07/07/2025 10:00 AM"
  createdAt: string; // ISO string
};

const STORAGE_KEY = "appointments_v1";
  
let appointments: Appointment[] = [];
const listeners = new Set<(apps: Appointment[]) => void>();
let hasLoadedFromStorage = false;

function notify() {
  for (const l of listeners) {
    l([...appointments]);
  }
}

async function loadFromStorageOnce() {
  if (hasLoadedFromStorage) return;
  hasLoadedFromStorage = true;
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (json) {
      appointments = JSON.parse(json);
    }
  } catch (e) {
    console.warn("Failed to load appointments", e);
  }
  notify();
}

async function saveToStorage() {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  } catch (e) {
    console.warn("Failed to save appointments", e);
  }
}

export async function addAppointment(app: Appointment) {
  appointments = [app, ...appointments]; // newest first
  await saveToStorage();
  notify();
}

export async function clearAppointments() {
  appointments = [];
  await saveToStorage();
  notify();
}

export function useAppointments() {
  const [apps, setApps] = useState<Appointment[]>(appointments);

  useEffect(() => {
    listeners.add(setApps);
    loadFromStorageOnce(); // load from AsyncStorage on first use

    return () => {
      listeners.delete(setApps);
    };
  }, []);

  return apps;
}
