const sceneIds = new Set([
  "MR-001", "MR-002", "MR-003", "MR-004",
  "MR-005", "MR-006", "MR-007", "MR-009",
]);

export function hasPlaceScene(id: string) {
  return sceneIds.has(id);
}

export function placeArtSrc(id: string) {
  return hasPlaceScene(id) ? `/images/places/${id}.webp` : `/places/${id}.svg`;
}

export function placeArtCaption(id: string) {
  return hasPlaceScene(id) ? "تصور فني · ليس صورة للمكان" : "رسم تعبيري · ليس صورة للمكان";
}
