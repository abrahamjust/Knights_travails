function generateNeighbours(x, y) {
    const moves = [[2, 1], [1, 2], [-1, 2], [-2, 1],
    [-2, -1], [-1, -2], [1, -2], [2, -1]];

    let possibleMoves = [];

    for (let move of moves) {
        if (x + move[0] >= 0 && x + move[0] < 8 && y + move[1] >= 0 && y + move[1] < 8) {
            possibleMoves.push([x + move[0], y + move[1]].join(","));
        }
    }
    return possibleMoves;
}

function knightsTravails(start, end) {
    let visited = [];
    let parent = Array(8).fill(0).map(() => Array(8).fill(null)); // fill the parent array with null so that we can access positions
    parent[start[0]][start[1]] = null; // parent of the start value is null
    let queue = [];
    queue.push(start);
    while (queue.length > 0) {

        let currentVertex = queue.shift(); // get the first value in the queue
        let nextMoves = generateNeighbours(currentVertex[0], currentVertex[1]); // generate the next neighbours of the current vertex
        if (nextMoves.includes(end.join(","))) { // if the neighbour of the current point is the end point
            parent[end[0]][end[1]] = currentVertex.join(","); // the parent of the end is the current vertex
            break;
        }

        visited.push(currentVertex.join(",")); // push the current vertex to the visited queue
        for (let move of nextMoves) {
            if (!visited.includes(move)) { // if neighbours not already visited, don't push to queue
                move = move.split(",").map(Number);
                parent[move[0]][move[1]] = currentVertex.join(","); // set parent of the neighbours as current vertex
                queue.push(move);
            }
        }
    }
    let path = [];
    let current = end.join(","); // start from end as string
    while (current) {
        path.push(current.split(",").map(Number)); // convert string to number array
        let [x, y] = current.split(",").map(Number); 
        current = parent[x][y]; // move to parent
    }
    path.reverse();
    let finalPath = "";
    for(let i = 0; i < path.length-1; i++) {
        finalPath += "[" + path[i] + "]" + " -> "; 
    }
    finalPath += "[" + path[path.length-1] + "]";
    console.log(`You made it in ${path.length - 1} moves! Here's your path`)
    console.log(finalPath);
}

// test cases
knightsTravails([0,0],[7,7]);
knightsTravails([3,3],[4,3]);
knightsTravails([3,3],[0,0]);
knightsTravails([0,0],[3,3]);