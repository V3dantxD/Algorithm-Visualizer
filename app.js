let clicked_btn = document.querySelectorAll(".clickedBtn");

clicked_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
        functionCaller(btn.id);
    });
});

function functionCaller(id) {
    switch (id) {
        case "countingSort":
            input_matrix = new matrix(1, 10, "matrix")
            output_matrix = new matrix(1, 10, "matrix2")
            calc_matrix = new matrix(1, 10, "matrix3")
            input_matrix.initialize_matrix_values();
            try1 = new counting_matrix(input_matrix, output_matrix, calc_matrix, "n + k", "n + k");
            break;

        case "bubbleSort":
            input_matrix = new matrix(1, 10, "matrix")
            output_matrix = new matrix(1, 10, "matrix2")
            calc_matrix = new matrix(1, 10, "matrix3")
            input_matrix.initialize_matrix_values();
            try2 = new bubblesort(input_matrix, output_matrix, calc_matrix, "n<superscript>2</superscript>", "1");
            break;
        case "insertionSort":
            input_matrix = new matrix(1, 5, "matrix")
            output_matrix = new matrix(1, 5, "matrix2")
            input_matrix.initialize_matrix_values();
            calc_matrix = new matrix(1, 5, "matrix3")
            try1 = new Insertion_sort(input_matrix, output_matrix, calc_matrix, "n<superscript>2</superscript>", "1");
            break;
        case "selectionSort":
            input_matrix = new matrix(1, 10, "matrix")
            output_matrix = new matrix(1, 10, "matrix2")
            calc_matrix = new matrix(1, 10, "matrix3")
            input_matrix.initialize_matrix_values();
            try3 = new selection_matrix(input_matrix, output_matrix, calc_matrix, "n<superscript>2</superscript>", "1");
            break;

        case "pascalsTriangle":
            input_matrix = new matrix(5, 5, "matrix")
            output_matrix = new matrix(1, 5, "matrix2")
            calc_matrix = new matrix(5, 5, "matrix3")
            try1 = new Pascal_Triangle(input_matrix, output_matrix, calc_matrix, "n<superscript>2</superscript>", "n<superscript>2</superscript>");
            break;

        case "fibonacci":
            input_matrix = new matrix(1, 10, "matrix")
            output_matrix = new matrix(1, 10, "matrix2")
            calc_matrix = new matrix(1, 10, "matrix3")
            try1 = new Fibonacci(input_matrix, output_matrix, calc_matrix, "n", "1");
            break;

        default:
            break;
    }
}

function setComplexity(timeC, spaceC) {
    document.getElementById("time").innerHTML = timeC;
    document.getElementById("space").innerHTML = spaceC;
}

class matrix {
    constructor(rows, cols, id) {
        this.rows = rows;
        this.cols = cols;
        this.id = id;
        this.matrix = [];
        this.initialize_matrix();
        this.renderMatrix();

    }

    initialize_matrix() {
        for (var i = 0; i < this.rows; i++) {
            this.matrix[i] = [];
            for (var j = 0; j < this.cols; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }


    // Function to render matrix in HTML table
    renderMatrix() {
        var tableBody = document.getElementById(this.id);
        var tableHtml = '';
        // Add column indices as header row
        tableHtml += '<tr><th></th>';
        for (var j = 0; j < this.cols; j++) {
            tableHtml += '<th class="index">' + j + '</th>';
        }
        tableHtml += '</tr>';
        // Add row indices and matrix data
        for (var i = 0; i < this.rows; i++) {
            tableHtml += '<tr>';
            tableHtml += '<th class="index">' + i + '</th>';
            for (var j = 0; j < this.cols; j++) {
                tableHtml += '<td><input type="text" id="' + this.id + '_' + i + '_' + j + '" value="' + this.matrix[i][j] + '" onchange="updateValue(' + i + ',' + j + ', this.value)"></td>';
            }
            tableHtml += '</tr>';
        }
        tableBody.innerHTML = tableHtml;
    }


    updateValue(i, j, value) {
        document.getElementById(this.id + "_" + i + "_" + j).value = value;
    }

    initialize_matrix_values() {
        // Generate a random integer between 0 and 9
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                var randomInteger = Math.floor(Math.random() * 10);
                this.updateValue(i, j, randomInteger);
            }
        }
    }
}



class counting_matrix {
    constructor(input_matrix, output_matrix, calc_matrix, timeC, spaceC) {
        this.input_matrix = input_matrix;
        this.output_matrix = output_matrix;
        this.calc_matrix = calc_matrix;
        setComplexity(timeC, spaceC);
        this.calc_matrix_show();
    }

    async calc_matrix_show() {
        for (var i = 0; i < this.input_matrix.rows; i++) {
            for (var j = 0; j < this.input_matrix.cols; j++) {
                document.getElementById(this.input_matrix.id + "_" + i + "_" + j).style.backgroundColor = "red";
                var val = document.getElementById(this.input_matrix.id + "_" + i + "_" + j).value;

                document.getElementById(this.calc_matrix.id + "_" + 0 + "_" + val).value = parseInt(document.getElementById(this.calc_matrix.id + "_" + i + "_" + val).value) + 1;
                document.getElementById(this.calc_matrix.id + "_" + 0 + "_" + val).style.backgroundColor = "red"

                await new Promise(resolve => setTimeout(resolve, 2000));
                document.getElementById(this.input_matrix.id + "_" + i + "_" + j).style.backgroundColor = "white";
                document.getElementById(this.calc_matrix.id + "_" + i + "_" + val).style.backgroundColor = "white"

            }
        }
        this.output_matrix_show();

    }
    async output_matrix_show() {

        for (var i = 0; i < this.calc_matrix.rows; i++) {
            var k = 0;
            for (var j = 0; j < this.calc_matrix.cols; j++) {
                var val = parseInt(document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).value);
                while (val != 0) {
                    document.getElementById(this.output_matrix.id + "_" + i + "_" + k).value = j;
                    document.getElementById(this.output_matrix.id + "_" + i + "_" + k).style.backgroundColor = "red";
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    document.getElementById(this.output_matrix.id + "_" + i + "_" + k).style.backgroundColor = "white";
                    k += 1;
                    val -= 1;
                }
            }
        }
    }
}

class bubblesort {
    constructor(input_matrix, output_matrix, calc_matrix, timeC, spaceC) {
        this.input_matrix = input_matrix;
        this.output_matrix = output_matrix;
        this.calc_matrix = calc_matrix;
        setComplexity(timeC, spaceC);
        this.calc_matrix_show();
    }


    async calc_matrix_show() {
        for (var i = 0; i < this.calc_matrix.rows; i++) {
            for (var j = 0; j < this.calc_matrix.cols; j++) {
                var val1 = document.getElementById(this.input_matrix.id + "_" + i + "_" + j).value;
                this.calc_matrix.updateValue(i, j, val1)
            }
        }

        for (var i = 0; i < this.calc_matrix.rows; i++) {
            for (var j = 0; j < this.calc_matrix.cols - 1; j++) {
                for (var k = 0; k < this.calc_matrix.cols - j - 1; k++) {
                    var val1 = document.getElementById(this.calc_matrix.id + "_" + i + "_" + k).value;
                    var val2 = document.getElementById(this.calc_matrix.id + "_" + i + "_" + (k + 1)).value;
                    if (val1 > val2) {
                        document.getElementById(this.calc_matrix.id + "_" + i + "_" + k).style.backgroundColor = "blue"
                        document.getElementById(this.calc_matrix.id + "_" + i + "_" + (k + 1)).style.backgroundColor = "blue"
                        document.getElementById(this.calc_matrix.id + "_" + i + "_" + k).value = val2
                        document.getElementById(this.calc_matrix.id + "_" + i + "_" + (k + 1)).value = val1;

                    } else {
                        document.getElementById(this.calc_matrix.id + "_" + i + "_" + k).style.backgroundColor = "red";
                        document.getElementById(this.calc_matrix.id + "_" + i + "_" + (k + 1)).style.backgroundColor = "red";
                    }
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + k).style.backgroundColor = "white";
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + (k + 1)).style.backgroundColor = "white";

                }
            }
        }
        this.output_matrix_show();
    }

    async output_matrix_show() {
        for (var i = 0; i < this.calc_matrix.rows; i++) {
            for (var j = 0; j < this.calc_matrix.cols; j++) {
                var val1 = parseInt(document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).value);
                this.output_matrix.updateValue(i, j, val1)
                document.getElementById(this.output_matrix.id + "_" + i + "_" + j).style.backgroundColor = "red";
                await new Promise(resolve => setTimeout(resolve, 2000));
                document.getElementById(this.output_matrix.id + "_" + i + "_" + j).style.backgroundColor = "white";

            }
        }
    }
}


class selection_matrix {
    constructor(input_matrix, output_matrix, calc_matrix, timeC, spaceC) {
        this.input_matrix = input_matrix;
        this.output_matrix = output_matrix;
        this.calc_matrix = calc_matrix;
        setComplexity(timeC, spaceC);
        this.calc_matrix_show();
    }

    async calc_matrix_show() {

        for (var i = 0; i < this.calc_matrix.rows; i++) {
            for (var j = 0; j < this.calc_matrix.cols; j++) {
                var val1 = document.getElementById(this.input_matrix.id + "_" + i + "_" + j).value;
                this.calc_matrix.updateValue(i, j, val1)
            }
        }

        for (var i = 0; i < this.calc_matrix.rows; i++) {
            for (var j = 0; j < this.calc_matrix.cols - 1; j++) {
                let min = j;
                for (var k = j + 1; k < this.calc_matrix.cols; k++) {
                    var minele = document.getElementById(this.calc_matrix.id + "_" + i + "_" + min).value;
                    var elem = document.getElementById(this.calc_matrix.id + "_" + i + "_" + k).value;
                    if (elem < minele) {
                        min = k;
                    }
                }
                if (min !== j) {
                    var elem2 = document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).value;
                    var minelem = document.getElementById(this.calc_matrix.id + "_" + i + "_" + min).value;
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + min).style.backgroundColor = "red";
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).style.backgroundColor = "red";
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + min).value = elem2;
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).value = minelem;
                } else {
                    break;
                }
                await new Promise(resolve => setTimeout(resolve, 2000));
                document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).style.backgroundColor = "white";
                document.getElementById(this.calc_matrix.id + "_" + i + "_" + min).style.backgroundColor = "white";
            }
        }
        this.output_matrix_show();
    }
    async output_matrix_show() {
        for (let i = 0; i < this.calc_matrix.rows; i++) {
            for (let j = 0; j < this.calc_matrix.cols; j++) {
                var val1 = parseInt(document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).value);
                this.output_matrix.updateValue(i, j, val1)
                document.getElementById(this.output_matrix.id + "_" + i + "_" + j).style.backgroundColor = "red";
                await new Promise(resolve => setTimeout(resolve, 2000));
                document.getElementById(this.output_matrix.id + "_" + i + "_" + j).style.backgroundColor = "white";
            }
        }
    }
}
class Insertion_sort {
    constructor(input_matrix, output_matrix, calc_matrix, timeC, spaceC) {
        this.input_matrix = input_matrix;
        this.output_matrix = output_matrix;
        this.calc_matrix = calc_matrix;
        setComplexity(timeC, spaceC);
        this.calc_matrix_show();
    }
    async calc_matrix_show() {
        for (var i = 0; i < this.calc_matrix.rows; i++) {
            for (var j = 0; j < this.calc_matrix.cols; j++) {
                var val1 = document.getElementById(this.input_matrix.id + "_" + i + "_" + j).value;
                this.calc_matrix.updateValue(i, j, val1)
            }
        }

        for (var i = 0; i < this.calc_matrix.rows; i++) {
            for (var j = 1; j < this.calc_matrix.cols; j++) {
                var k = j - 1;
                var val1 = parseInt(document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).value);
                // Highlight the current element being considered
                document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).style.backgroundColor = "yellow";
                while (k >= 0) {
                    var val2 = parseInt(document.getElementById(this.calc_matrix.id + "_" + i + "_" + k).value);
                    // Highlight the element being compared with val1
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + k).style.backgroundColor = "lightblue";
                    await new Promise(resolve => setTimeout(resolve, 500)); // Delay for visualization
                    if (val2 > val1) {
                        document.getElementById(this.calc_matrix.id + "_" + i + "_" + (k + 1)).value = val2;
                        // Highlight the position where the swap occurs
                        document.getElementById(this.calc_matrix.id + "_" + i + "_" + (k + 1)).style.backgroundColor = "orange";
                        await new Promise(resolve => setTimeout(resolve, 500)); // Delay for visualization
                        k--;
                    } else {
                        break;
                    }
                }
                // Assign val1 to its sorted position
                document.getElementById(this.calc_matrix.id + "_" + i + "_" + (k + 1)).value = val1;
                // Reset background colors after sorting
                await new Promise(resolve => setTimeout(resolve, 2000)); // Delay for visualization
                for (var m = 0; m < this.calc_matrix.cols; m++) {
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + m).style.backgroundColor = "white";
                }
            }
        }
        this.output_matrix_show();
    }

    async output_matrix_show() {
        for (var i = 0; i < this.calc_matrix.rows; i++) {
            for (var j = 0; j < this.calc_matrix.cols; j++) {
                var val1 = parseInt(document.getElementById(this.calc_matrix.id + "" + i + "" + j).value);
                this.output_matrix.updateValue(i, j, val1)
                document.getElementById(this.output_matrix.id + "" + i + "" + j).style.backgroundColor = "red";
                await new Promise(resolve => setTimeout(resolve, 2000));
                document.getElementById(this.output_matrix.id + "" + i + "" + j).style.backgroundColor = "white";

            }
        }
    }
}

class Fibonacci {
    constructor(input_matrix, output_matrix, calc_matrix, timeC, spaceC) {
        this.input_matrix = input_matrix;
        this.output_matrix = output_matrix;
        this.calc_matrix = calc_matrix;
        setComplexity(timeC, spaceC);
        this.calc_matrix_show();
    }

    async calc_matrix_show() {
        for (var i = 0; i < this.calc_matrix.rows; i++) {
            for (var j = 0; j < this.calc_matrix.cols; j++) {
                if (j == 0) {
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).value = 0;
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).style.backgroundColor = "blue";
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).style.backgroundColor = "white";


                } else if (j == 1) {
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).value = 1;
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).style.backgroundColor = "blue";
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).style.backgroundColor = "white";

                } else {
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + (j - 2)).style.backgroundColor = "blue";
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + (j - 1)).style.backgroundColor = "blue";
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).style.backgroundColor = "red";
                    var val1 = parseInt(document.getElementById(this.calc_matrix.id + "_" + i + "_" + (j - 2)).value);
                    var val2 = parseInt(document.getElementById(this.calc_matrix.id + "_" + i + "_" + (j - 1)).value);
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).value = val1 + val2;
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + (j - 2)).style.backgroundColor = "white";
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + (j - 1)).style.backgroundColor = "white";
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).style.backgroundColor = "white";

                }
            }
        }
        this.output_matrix_show()
    }
    async output_matrix_show() {
        for (var i = 0; i < this.calc_matrix.rows; i++) {
            for (var j = 0; j < this.calc_matrix.cols; j++) {
                var val1 = parseInt(document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).value);
                this.output_matrix.updateValue(i, j, val1)
                document.getElementById(this.output_matrix.id + "_" + i + "_" + j).style.backgroundColor = "red";
                await new Promise(resolve => setTimeout(resolve, 2000));
                document.getElementById(this.output_matrix.id + "_" + i + "_" + j).style.backgroundColor = "white";

            }
        }
    }
}
class Pascal_Triangle {
    constructor(input_matrix, output_matrix, calc_matrix, timeC, spaceC) {
        this.input_matrix = input_matrix;
        this.output_matrix = output_matrix;
        this.calc_matrix = calc_matrix;
        setComplexity(timeC, spaceC);
        this.calc_matrix_show();
    }
    async calc_matrix_show() {
        for (var i = 0; i < this.calc_matrix.rows; i++) {
            this.calc_matrix[i] = [];
            for (var j = 0; j <= i; j++) {
                if (j === 0 || j === i) {
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).style.backgroundColor = "red";
                    this.calc_matrix.updateValue(i, j, 1);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).style.backgroundColor = "white";


                } else {
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).style.backgroundColor = "red";
                    document.getElementById(this.calc_matrix.id + "_" + (i - 1) + "_" + (j - 1)).style.backgroundColor = "blue";
                    document.getElementById(this.calc_matrix.id + "_" + (i - 1) + "_" + j).style.backgroundColor = "blue";

                    var val = parseInt(document.getElementById(this.calc_matrix.id + "_" + (i - 1) + "_" + (j - 1)).value) + parseInt(document.getElementById(this.calc_matrix.id + "_" + (i - 1) + "_" + j).value);
                    this.calc_matrix.updateValue(i, j, val);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    document.getElementById(this.calc_matrix.id + "_" + i + "_" + j).style.backgroundColor = "white";
                    document.getElementById(this.calc_matrix.id + "_" + (i - 1) + "_" + (j - 1)).style.backgroundColor = "white";
                    document.getElementById(this.calc_matrix.id + "_" + (i - 1) + "_" + j).style.backgroundColor = "white";
                }
            }
        }
        this.output_matrix_show();
    }
    async output_matrix_show() {
        for (var j = 0; j < this.output_matrix.cols; j++) {
            var val = parseInt(document.getElementById(this.calc_matrix.id + "_" + (this.calc_matrix.rows - 1) + "_" + j).value);
            this.output_matrix.updateValue(0, j, val);
            document.getElementById(this.output_matrix.id + "_" + 0 + "_" + j).style.backgroundColor = "red";
            await new Promise(resolve => setTimeout(resolve, 2000));
            document.getElementById(this.output_matrix.id + "_" + 0 + "_" + j).style.backgroundColor = "white";

        }
    }
}