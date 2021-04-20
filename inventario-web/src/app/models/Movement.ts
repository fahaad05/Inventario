import * as moment from "moment";

export interface Movement {
  userId: number,
  garmentId: number,
  id?: number,
  movementType?: string,
  movementDate: Date
}
