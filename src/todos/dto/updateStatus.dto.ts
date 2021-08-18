interface IStatusHistory {
  status: string;
  when: Date;
}

export class UpdateStatusDTO {
  status_history: Array<IStatusHistory>;
  newStatus: string;
}
