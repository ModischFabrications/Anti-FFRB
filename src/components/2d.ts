

export function hasAnyCollision(faces: number[][], hands: number[][], threshold: number): boolean {
    // This is O(n^2), but at least it short-circuits on collisions
    for (const f of faces) {
        for (const h of hands) {
            if (hasCollision(f, h, threshold)) return true;
        }
    }

    return false;
}

// technically AABB collisions
function hasCollision(face: number[], hand: number[], threshold: number): boolean {
    let hIsRightDist = hand[0] - (face[0] + face[2]);       // dist between left of hand and right of face
    let hIsLeftDist = face[0] - (hand[0] + hand[2]);

    let hIsLowerDist = hand[1] - (face[1] + face[3]);
    let hIsHigherDist = face[1] - (hand[1] + hand[3]);
    // console.log(`hIsRightDist=${hIsRightDist.toFixed(1)}, hIsLeftDist=${hIsLeftDist.toFixed(1)}, hIsLowerDist=${hIsLowerDist.toFixed(1)}, hIsHigherDist=${hIsHigherDist.toFixed(1)}`);

    return (Math.max(hIsRightDist, hIsLeftDist) < threshold && Math.max(hIsLowerDist, hIsHigherDist) < threshold);
}
