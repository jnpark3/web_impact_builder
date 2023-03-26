const componentContainer = require('./component_class')

var c1_1 = new componentContainer(
    'Title & Description',
    [[20, 61, 147, 28], [207, 43, 147, 9], [207, 43+19, 147, 9], [207, 43+38, 147, 9], [207, 43+57, 147, 9]],
    '<div><div>#input_0#</div><div>#input_1#</div><div>',
    ['Placeholder', 'Placeholder text'],
    ['Header', 'Body Text']
)

var c1_2 = new componentContainer(
    'Title & Description Clone',
    [[20, 61, 147, 28], [207, 43, 147, 9], [207, 43+19, 147, 9], [207, 43+38, 147, 9], [207, 43+57, 147, 9]],
    '<div><div>#input_0#</div><div>#input_1#</div><div>',
    ['Placeholder 2', 'Placeholder text'],
    ['Header', 'Body Text']
)

var clist = [[c1_1, c1_2]]

module.exports = clist