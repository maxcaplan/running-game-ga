class NeuralNetwork {
    constructor(a, b, c) {
        // this.model = a
        this.input_nodes = a
        this.hidden_nodes = b
        this.output_nodes = c
        this.createModel();
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

    dispose() {
        this.model.dispose();
    }
}