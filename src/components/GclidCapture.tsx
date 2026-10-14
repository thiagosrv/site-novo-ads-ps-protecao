"use client";

import { useEffect } from "react";
import { captureAttribution, captureGclid } from "@/lib/gclid";

export default function GclidCapture() {
  useEffect(() => {
    captureGclid();
    captureAttribution();
  }, []);

  return null;
}
