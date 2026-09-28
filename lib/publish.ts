export function isPublishable(record: { publish_ready: boolean; status: string }) {
  return record.publish_ready === true && record.status === "closed_ready";
}
