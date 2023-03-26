const componentContainer = require('./component_class')

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

var c2_0 = new componentContainer(
    'Call to Action',
    [[0, 0, 169, 150], [229, 43, 89, 64]],
    '<div style="background-color: #primary_color#; width: 100%; height: 800px; display: flex; flex-direction: row;">\n<div style="min-width: 300px; box-sizing: border-box; justify-content: center; width: 40%; height: 100%; padding: 6vw; display: flex; flex-direction: column">\n<div style="color: #tertiary_color#; font-weight: bold; font-size: 36px; margin-bottom: 18px">#input_1#</div>\n<div style="color: #tertiary_color#; font-size: 16px; margin-bottom: 18px">#input_2#</div>\n<button onclick="window.location.href=`#input_4#`;"" style="cursor: pointer; border: 0px; border-radius: 3px; background-color: #secondary_color#; font-size: 16px; padding: 12px 20px;">#input_3#</div>\n<div style="max-width: 60%; overflow: hidden; display: flex; align-items: center; justify-content: center;">\n<img draggable="false" src="#input_0#" style="object-fit: contain; width: 100%; display: flex; align-items: center; justify-content: center;object-fit: contain;"></img>\n</div>\n</div>\n</div>\n',
    ['./assets/default_1.png', 'Everybody deserves a chance.', 'Our organization has been helping people for over a decade, and we want to do even more.', 'Donate', 'https://donorbox.org/fundraising-campaign-10'],
    ['Image', 'Header', 'Text', 'Button Text', 'Button URL']
)

var c1_1 = new componentContainer(
    'Title & Description Row',
    [[20, 61, 147, 28], [207, 43, 147, 9], [207, 43 + 19, 147, 9], [207, 43 + 38, 147, 9], [207, 43 + 57, 147, 9]],
    '<div style="padding-top: 3vw; padding-bottom: 3vw; width: 100%;min-height: fit-content;background-color: #primary_color#;display: flex;flex-direction: row;align-items: center;">\n<div style="padding: 6vw; width: 40%; height: fit-content;">\n<div style="color: #tertiary_color#; font-weight: bold; font-size: 36px; display: flex; flex-direction: row; align-items: center;">#input_0#\n</div>\n</div>\n<div style="padding: 6vw; width: 60%; height: fit-content; display: flex; flex-direction: row; align-items: center;">\n<div style="color: #tertiary_color#; font-size: 16px">#input_1#\n</div>\n</div>\n</div>',
    ['Change the world one step at a time.', lorem],
    ['Header', 'Body Text']
)

var c1_2 = new componentContainer(
    'Title & Description Column',
    [[20, 61, 147, 28], [207, 43, 147, 9], [207, 43 + 19, 147, 9], [207, 43 + 38, 147, 9], [207, 43 + 57, 147, 9]],
    '<div style="max-width: 100%; height: fit-content;background-color: #primary_color#;display: flex;flex-direction: column;padding: 6vw; padding-top: 9vw; padding-bottom: 9vw;">\n<div style="width: 100%; height: fit-content; margin-bottom: 6vw;">\n<div style="color: #tertiary_color#; font-weight: bold; font-size: 36px; display: flex; flex-direction: row; align-items: center;">#input_0#</div>\n</div>\n<div style="width: 100%; height: fit-content; display: flex; flex-direction: row; align-items: center;">\n<div style="color: #tertiary_color#; font-size: 16px">#input_1#</div>\n</div>\n</div>',
    ['We need your help to make the world a better place.', lorem],
    ['Header', 'Body Text']
)

var c_1 = [c2_0, c1_1, c1_2]

var c2_1 = new componentContainer(
    'Image Flat',
    [[72, 31, 124, 89], [212, 56, 89, 64]],
    '<div style="height: 300px; width: 100%; overflow: hidden; display: flex; flex-direction: row; align-items: center; justify-content: center; background-color:#secondary_color#">\n<img draggable="false" src="#input_0#" style="object-fit: contain; max-width: 100%">\n</div>',
    ['./assets/default_2.jpeg'],
    ['Image']
)

var c2_2 = new componentContainer(
    'Image Full',
    [[72, 31, 124, 89], [212, 56, 89, 64]],
    '<div style="height: 600px; width: 100%; overflow: hidden; display: flex; flex-direction: row; align-items: center; justify-content: center; background-color:#secondary_color#">\n<img draggable="false" src="#input_0#" style="object-fit: contain; max-width: 100%">\n</div>',
    ['./assets/default_4.jpeg'],
    ['Image']
)

var c_2 = [c2_1, c2_2]

var c3_1 = new componentContainer(
    'Video',
    [[22, 26, 140, 98], [207, 43, 147, 9], [207, 43 + 19, 147, 9], [207, 43 + 38, 147, 9], [207, 43 + 57, 147, 9]],
    '<div style="width: 100%; min-height: 500px; display: flex; flex-direction: row; background-color:#primary_color#; align-items: center">\n<iframe width="60%" height="300px" style="margin-left: 6vw;" src="#input_2#" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>\n<div style="width: 40%; height: 100%; display: flex; flex-direction: column; padding: 6vw">\n<div style="font-weight: bold; font-size: 36px; color: #tertiary_color#; margin-bottom: 18px;">#input_0#</div>\n<div style="font-size: 16px; color: #tertiary_color#;">#input_1#</div>\n</div>\n</div>',
    ['See how far we\'ve come.', lorem, 'https://www.youtube.com/embed/VvgzVlyAE6Y'],
    ['Header', 'Body', 'Video URL']
)

var c_3 = [c3_1]

var c4_1 = new componentContainer(
    'Survey',
    [[22, 26, 140, 98], [207, 43, 147, 9], [207, 43 + 19, 147, 9], [207, 43 + 38, 147, 9], [207, 43 + 57, 147, 9]],
    '<div style="width: 100%; min-height: 500px; display: flex; flex-direction: row; background-color:#primary_color#; align-items: center">\n<div style="width: 60%; height: 100%; display: flex; align-items: center; justify-content: center">\n<div style="width: 70%; height: fit-content; background-color: #tertiary_color#; display: flex; flex-direction: column; padding: 24px; border-radius: 3px"><div style="color: #primary_color#; font-size: 24; margin-bottom: 16px; font-weight: bold;">Survey:</div>\n<div style="color: #primary_color#; font-size: 16; margin-bottom: 8px;" placeholder="#input_0#" id="input_1">#input_0#</div>\n<input style="color: #primary_color#; font-size: 24; margin-bottom: 16px; height: 32px;" placeholder="#input_0#" id="input_1"/>\n<div style="color: #primary_color#; font-size: 16; margin-bottom: 8px;" placeholder="#input_0#" id="input_1">\n#input_1#\n</div>\n<input style="color: #primary_color#; font-size: 24; margin-bottom: 16px; height: 32px;" placeholder="#input_1#" id="input_2"/>\n<div style="color: #primary_color#; font-size: 16; margin-bottom: 8px;" placeholder="#input_0#" id="input_1">\n#input_2#\n</div>\n<input style="color: #primary_color#; font-size: 24; margin-bottom: 16px; height: 32px;" placeholder="#input_2#" id="input_3"/>\n<button style="background-color: #secondary_color#; color: #primary_color#; font-size: 24; height: fit-content; padding: 10px 20px; border: 0px; border-radius: 3px; width: fit-content; cursor: pointer;" (click)="surveySubmit()" id="surveyButton">Submit</button>\n</div>\n</div>\n<div style="width: 40%; height: 100%; display: flex; flex-direction: column; padding: 6vw">\n<div style="font-weight: bold; font-size: 36px; color: #tertiary_color#; margin-bottom: 18px;">#input_3#</div>\n<div style="font-size: 16px; color: #tertiary_color#;">#input_4#</div>\n</div>\n</div>',
    ['First Name', 'Last Name', 'Email', 'Let\'s keep in touch.', lorem],
    ['Input 1 Name', 'Input 2 Name', 'Input 3 Name', 'Header', 'Body']
)

var c_4 = [c4_1]

var c5_1 = new componentContainer(
    'Donation',
    [[0, 0, 169, 150], [229, 43, 89, 64]],
    '<script src="https://donorbox.org/widget.js" paypalExpress="false">\n</script>\n<div style="box-sizing: border-box; width: 100%; max-height: 600px; overflow: hidden; display: flex; flex-direction: row; background-color:#primary_color#; align-items: center; padding: 6vw">\n<iframe src="https://donorbox.org/embed/fundraising-campaign-10" name="donorbox" allowpaymentrequest="allowpaymentrequest" seamless="seamless" frameborder="0" scrolling="no" height="900px" width="100%" style="margin-right: 6vw; max-width: 500px; min-width: 250px; max-height: 500px;">\n</iframe>\n<div style="height: 100%; display: flex; flex-direction: column">\n<div style="font-size: 36px; color: #tertiary_color#; font-weight: bold; margin-bottom: 16px;">#input_0#</div>\n<div style="font-size: 16px; color: #tertiary_color#; max-width: 75%">#input_1#</div>\n</div>\n</div>',
    ['We need your help.', lorem],
    ['Header', 'Body'],
)

var c_5 = [c5_1]

var c_6 = []

var clist = [c_1, c_2, c_3, c_4, c_5, c_6]

module.exports = clist