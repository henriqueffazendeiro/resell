"use client";

import { useState } from "react";

export function useAppReady() {
  const [isReady] = useState(true);

  return isReady;
}
