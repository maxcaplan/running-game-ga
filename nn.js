class NeuralNetwork {
    constructor(a, b, c, d) {
        // If a is a model create neural network with models weights
        if (a instanceof tf.Sequential) {
            this.model = a;
            this.input_nodes = b;
            this.hidden_nodes = c;
            this.output_nodes = d;
        } else {
            // if a is an int then create new neural network with random weights
            this.input_nodes = a;
            this.hidden_nodes = b;
            this.output_nodes = c;
            this.createModel();
        }
    }

    createModel() {
        this.model = tf.sequential();
        const hidden = tf.layers.dense({
            units: this.hidden_nodes,
            inputShape: [this.input_nodes],
            activation: 'sigmoid'
        })
        const output = tf.layers.dense({
            units: this.output_nodes,
            activation: 'softmax'
        })
        this.model.add(hidden)
        this.model.add(output)
        return this.model
    }

    predict(inputs) {
        return tf.tidy(() => {
            // put input values into tensor
            const xs = tf.tensor2d([inputs]);
            // make prediction
            const ys = this.model.predict(xs);
            // fetch data from processor
            const outputs = ys.dataSync();

            return outputs
        })
    }

    mutate(rate) {
        tf.tidy(() => {
            const weights = this.model.getWeights();
            const mutatedWeights = [];
            for (let i = 0; i < weights.length; i++) {
                let tensor = weights[i];
                let shape = weights[i].shape;
                let values = tensor.dataSync().slice();
                for (let j = 0; j < values.length; j++) {
                    if (random(1) < rate) {
                        let w = values[j];
                        values[j] = w + randomGaussian();
                    }
                }
                let newTensor = tf.tensor(values, shape);
                mutatedWeights[i] = newTensor;
            }
            this.model.setWeights(mutatedWeights);
        });
    }

    copy() {
        return tf.tidy(() => {
            // create new model to copy weights on to
            const modelCopy = this.createModel();
            // get old models weights
            const weights = this.model.getWeights();

            // copy old models weights into new array
            const weightCopies = [];
            for (let i = 0; i < weights.length; i++) {
                weightCopies[i] = weights[i].clone()
            }

            // put copied weights into new model
            modelCopy.setWeights(weightCopies)

            // return a new neural network with copied weights
            return new NeuralNetwork(modelCopy, this.input_nodes, this.hidden_nodes, this.output_nodes);
        })
    }

    mutate() {

    }

    dispose() {
        // this.model.dispose();
    }
}