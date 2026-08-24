import { Activity, DayItinerary, DisruptionAlert, ReplanProposal, Trip, WeatherCondition } from './trip';

export type AgentStepName = 
  | 'analyzing_weather'
  | 'evaluating_itinerary'
  | 'detecting_disruptions'
  | 'searching_alternatives'
  | 'optimizing_routes'
  | 'evaluating_budget'
  | 'synthesizing_replan';

export interface AgentStepStatus {
  step: AgentStepName;
  label: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  details?: string;
}

export interface DisruptionDetectionResult {
  disruptionDetected: boolean;
  type: 'weather' | 'closure' | 'transit' | 'flight';
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  affectedActivities: Activity[];
  reason: string;
  weatherSnapshot?: WeatherCondition;
}

export interface AlternativeMatchResult {
  originalActivity: Activity;
  alternatives: Activity[];
  topAlternative: Activity;
  selectionRationale: string;
  preferenceAlignmentScore: number;
}

export interface ReplannerResult {
  proposal: ReplanProposal;
  agentSteps: AgentStepStatus[];
}
