"use client";

import React, { LabelHTMLAttributes, ReactNode } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  htmlFor?: string;
}

export function Label({ children, htmlFor, ...props }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-800 mb-2 tracking-wide"
      {...props}
    >
      {children}
    </label>
  );
}
