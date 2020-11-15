[{
    id: 1,
    name: '部门A',
    parentId: 0,
    children: [{
      {
        id: 3,
        name: '部门C',
        parentId: 1,
        chilren: [{
          id: 6,
          name: "部门F",
          parentId: 2
        }]
      },
      {
        id: 4,
        name: '部门D',
        parentId: 1
      }
    }]
  },
  {
    id: 2,
    name: '部门B',
    parentId: 0,
    children: [{
      id: 5,
      name: '部门E',
      parentId: 2
    }, {
      id: 5,
      name: '部门E',
      parentId: 2
    }]
  }
]
