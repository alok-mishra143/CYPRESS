"use client";

import React, { useState, useEffect } from "react";
import { passwordStrength } from "check-password-strength";
import { Progress } from "@radix-ui/react-progress";

interface StrengthPassProps {
  password: string;
}

const StrengthPass = ({ password }: StrengthPassProps) => {
  const [passvalue, setpassvalue] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const passStrength = passwordStrength(password).value;
    const passProgress = passwordStrength(password).id;
    setpassvalue(passStrength);
    setProgress(passProgress);
  }, [password]);

  console.log("password", password);
  console.log("passvalue", passvalue);
  console.log("progress", progress);

  return (
    <div className="bg-blue">
      <div>{passvalue}</div>
      <Progress
        value={(progress + 1) * 25}
        max={100}
        className=" h-1 rounded-full"
      />
    </div>
  );
};

export default StrengthPass;
