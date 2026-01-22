import { useState } from "react";
import Start from "./pages/Start";
import AssessmentHome from "./pages/AssessmentHome";
import Result from "./pages/Result";
import React from "react";

type Screen = "start" | "home" | "result";

export default function App() {
  const [screen, setScreen] = useState<Screen>("start");

  const [resultData, setResultData] = useState<{
    bestCareer: string;
    topCareers: { name: string; score: number }[];
  } | null>(null);

  return (
    <>
      {screen === "start" && (
        <Start onStart={() => setScreen("home")} />
      )}

      {screen === "home" && (
        <AssessmentHome
          onFinish={(result) => {
            setResultData(result);
            setScreen("result");
          }}
        />
      )}

      {screen === "result" && resultData && (
        <Result result={resultData} />
      )}
    </>
  );
}
