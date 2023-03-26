class componentContainer {
    constructor(name, minimap, html, inputs, input_names) {
      this.name = name;
      this.minimap = minimap
      this.html = html
      this.inputs = inputs
      this.input_names = input_names
    }

    generate_html(settings) {
      let generated_html = this.html;
      for (let key in settings) {
        if (Object.prototype.hasOwnProperty.call(settings, key)) {
            generated_html = generated_html.replace(new RegExp(`#${key}#`, 'g'), settings[key]);
        }
      }
      for (let i = 0; i < this.inputs.length; i++) {
        generated_html = generated_html.replace(new RegExp(`#input_${i}#`, 'g'), this.inputs[i]);
      }
      return generated_html;
    }

    copy(){
        return new componentContainer(this.name, JSON.parse(JSON.stringify(this.minimap)), this.html, JSON.parse(JSON.stringify(this.inputs)), JSON.parse(JSON.stringify(this.input_names)))
    }
}

module.exports = componentContainer