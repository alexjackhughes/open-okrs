"use client";

import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

interface KeyResult {
  id: number;
  description: string;
  progress: number;
}

interface Objective {
  id: number;
  title: string;
  keyResults: KeyResult[];
}

export function EnhancedOkrTemplate() {
  const [overarchingGoal, setOverarchingGoal] = useState(
    "Achieve market leadership through innovation and customer satisfaction"
  );
  const [objectives, setObjectives] = useState<Objective[]>([
    {
      id: 1,
      title: "Increase customer satisfaction",
      keyResults: [
        {
          id: 1,
          description: "Improve response time to under 2 hours",
          progress: 60,
        },
        { id: 2, description: "Increase NPS score by 20 points", progress: 40 },
      ],
    },
  ]);

  const addObjective = () => {
    const newId = Math.max(0, ...objectives.map((obj) => obj.id)) + 1;
    setObjectives([...objectives, { id: newId, title: "", keyResults: [] }]);
  };

  const removeObjective = (id: number) => {
    setObjectives(objectives.filter((obj) => obj.id !== id));
  };

  const updateObjective = (id: number, title: string) => {
    setObjectives(
      objectives.map((obj) => (obj.id === id ? { ...obj, title } : obj))
    );
  };

  const addKeyResult = (objectiveId: number) => {
    setObjectives(
      objectives.map((obj) => {
        if (obj.id === objectiveId) {
          const newId = Math.max(0, ...obj.keyResults.map((kr) => kr.id)) + 1;
          return {
            ...obj,
            keyResults: [
              ...obj.keyResults,
              { id: newId, description: "", progress: 0 },
            ],
          };
        }
        return obj;
      })
    );
  };

  const removeKeyResult = (objectiveId: number, keyResultId: number) => {
    setObjectives(
      objectives.map((obj) => {
        if (obj.id === objectiveId) {
          return {
            ...obj,
            keyResults: obj.keyResults.filter((kr) => kr.id !== keyResultId),
          };
        }
        return obj;
      })
    );
  };

  const updateKeyResult = (
    objectiveId: number,
    keyResultId: number,
    field: "description" | "progress",
    value: string | number
  ) => {
    setObjectives(
      objectives.map((obj) => {
        if (obj.id === objectiveId) {
          return {
            ...obj,
            keyResults: obj.keyResults.map((kr) =>
              kr.id === keyResultId ? { ...kr, [field]: value } : kr
            ),
          };
        }
        return obj;
      })
    );
  };

  return (
    <div className="container mx-auto p-4 bg-black text-white min-h-screen">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-white text-center">
          Overarching Goal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={overarchingGoal}
          onChange={(e) => setOverarchingGoal(e.target.value)}
          className="text-xl text-center border-none resize-none focus:ring-0 bg-black text-white placeholder-zinc-500"
          placeholder="Enter your overarching goal"
          rows={2}
        />
      </CardContent>

      <div className="flex flex-wrap -mx-4">
        {objectives.map((objective) => (
          <div
            key={objective.id}
            className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8"
          >
            <Card className="h-full bg-zinc-900 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold text-white">
                  Objective
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeObjective(objective.id)}
                  className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="pt-0">
                <Textarea
                  value={objective.title}
                  onChange={(e) =>
                    updateObjective(objective.id, e.target.value)
                  }
                  className="text-lg font-semibold mb-4 border-none resize-none focus:ring-0 bg-zinc-900 text-white placeholder-zinc-500"
                  placeholder="Enter your objective"
                  rows={2}
                />
                <div className="space-y-4">
                  {objective.keyResults.map((kr) => (
                    <div key={kr.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-md font-bold text-zinc-300">
                          Key Result
                        </Label>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeKeyResult(objective.id, kr.id)}
                          className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Textarea
                        value={kr.description}
                        onChange={(e) =>
                          updateKeyResult(
                            objective.id,
                            kr.id,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Enter key result"
                        className="border-none selection:border border-white resize-none focus:ring-0 bg-zinc-900 text-white placeholder-zinc-500 text-md"
                        rows={2}
                      />
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label className="text-zinc-300">Progress</Label>
                          <span className="text-sm text-zinc-400">
                            {kr.progress}%
                          </span>
                        </div>
                        <Slider
                          value={[kr.progress]}
                          onValueChange={(value) =>
                            updateKeyResult(
                              objective.id,
                              kr.id,
                              "progress",
                              value[0]
                            )
                          }
                          max={100}
                          step={1}
                          className="bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => addKeyResult(objective.id)}
                  className="mt-8 w-full bg-white text-black hover:bg-zinc-200"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Key Result
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 flex items-center justify-center">
          <Card
            className="h-full w-full bg-zinc-900 border-zinc-800 cursor-pointer transition-all duration-300 ease-in-out hover:bg-zinc-800 hover:border-zinc-700"
            onClick={addObjective}
          >
            <CardContent className="flex items-center justify-center h-full">
              <div className="flex items-center justify-center w-full h-full text-white">
                <Plus className="mr-2 h-6 w-6" />
                <span className="text-lg font-semibold">Add Objective</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
