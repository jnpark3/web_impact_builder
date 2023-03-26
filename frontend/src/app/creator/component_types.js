const componentContainer = require('./component_class')

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

var c1_1 = new componentContainer(
    'Title & Description',
    [[20, 61, 147, 28], [207, 43, 147, 9], [207, 43 + 19, 147, 9], [207, 43 + 38, 147, 9], [207, 43 + 57, 147, 9]],
    '<div style="width: 100%;min-height: 250px;background-color: #primary_color#;display: flex;flex-direction: row;align-items: center;">\n<div style="padding: 40px; width: 40%; height: fit-content;">\n<div style="color: #tertiary_color#; font-weight: bold; font-size: 36px; display: flex; flex-direction: row; align-items: center;">#input_0#\n</div>\n</div>\n<div style="padding: 40px; width: 60%; height: fit-content; display: flex; flex-direction: row; align-items: center;">\n<div style="color: #tertiary_color#; font-size: 16px">#input_1#\n</div>\n</div>\n</div>',
    ['Change the world one step at a time.', lorem],
    ['Header', 'Body Text']
)

var c1_2 = new componentContainer(
    'Title & Description Clone',
    [[20, 61, 147, 28], [207, 43, 147, 9], [207, 43 + 19, 147, 9], [207, 43 + 38, 147, 9], [207, 43 + 57, 147, 9]],
    '<div><div>#input_0#</div><div>#input_1#</div><div>',
    ['Placeholder 2', 'Placeholder text'],
    ['Header', 'Body Text']
)

var c_1 = [c1_1, c1_2]

var c2_1 = new componentContainer(
    'Image Flat',
    [[72, 31, 124, 89], [212, 56, 89, 64]],
    '<div style="height: 300px; width: 100%; background-color:#primary_color#">\n</div>',
    [{}],
    ['Image']
)

var c_2 = [c2_1]

var c_3 = []

var c_4 = []

var c_5 = []

var c_6 = []

var clist = [c_1, c_2, c_3, c_4, c_5, c_6]

module.exports = clist