import { GET, POST } from "@/common/services/api";
import type { Score } from "../../type/score.type";

type CreateScorePayload = Omit<Score,"created_at" | "id">
export async function  sendScore (
    payload:CreateScorePayload) {
    return  await POST<CreateScorePayload,any>({
            payload: payload,
            path: '/scores'
          })
}

export async function  getAllScores () {
    return  await GET<any>({
            path: '/scores/top'
          })
}

export async function  getStat () {
    return  await GET<any>({
            path: '/scores/stats'
          })
}