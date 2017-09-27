function buildLayer (arrayData, levels) {
  function process (currentLevelIndex, parentValue) {
    let data = []
    const nodes = []
    const currentLevel = levels[currentLevelIndex]
    const parentLevel = currentLevelIndex === 0 ? null : levels[currentLevelIndex - 1]

    if (currentLevelIndex === levels.length) {
      return null
    }

    if (parentValue) {
      data = arrayData.filter(item => item[parentLevel.refPropName] === parentValue)
    } else {
      data = arrayData
    }

    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      const value = item[currentLevel.refPropName]

      if (nodes.filter(n => n[currentLevel.refPropName] === value).length > 0) {
        continue
      }

      const node = {}
      node[currentLevel.refPropName] = value
      currentLevel.otherProps.forEach(prop => node[prop] = item[prop])
      node.children = process(currentLevelIndex + 1, value)
      nodes.push(node)
    }

    return nodes
  }
  return process(0, null)
}

function test () {
  const levels = [
    { refPropName: 'terrainid', otherProps: ['terrain'] },
    { refPropName: 'areaid', otherProps: ['area'] },
    { refPropName: 'measureid', otherProps: ['measure'] }
  ]
  const data = [
      {
          "terrain": "ƽԭ��",
          "area": "����������ʩ����",
          "measure": "���̴�ʩ",
          "terrainid": 102,
          "areaid": 105,
          "measureid": 119
      },
      {
          "terrain": "ƽԭ��",
          "area": "����������ʩ����",
          "measure": "���̴�ʩ",
          "terrainid": 102,
          "areaid": 105,
          "measureid": 119
      },
      {
          "terrain": "ƽԭ��",
          "area": "����������ʩ����",
          "measure": "���̴�ʩ",
          "terrainid": 102,
          "areaid": 105,
          "measureid": 119
      },
      {
          "terrain": "ƽԭ��",
          "area": "����������ʩ����",
          "measure": "ֲ����ʩ",
          "terrainid": 102,
          "areaid": 105,
          "measureid": 121
      },
      {
          "terrain": "ƽԭ��",
          "area": "����������ʩ����",
          "measure": "��ʱ��ʩ",
          "terrainid": 102,
          "areaid": 105,
          "measureid": 120
      },
      {
          "terrain": "ƽԭ��",
          "area": "����������ʩ����",
          "measure": "��ʱ��ʩ",
          "terrainid": 102,
          "areaid": 105,
          "measureid": 120
      },
      {
          "terrain": "ƽԭ��",
          "area": "����������ʩ����",
          "measure": "��ʱ��ʩ",
          "terrainid": 102,
          "areaid": 105,
          "measureid": 120
      },
      {
          "terrain": "ƽԭ��",
          "area": "����������ʩ����",
          "measure": "��ʱ��ʩ",
          "terrainid": 102,
          "areaid": 105,
          "measureid": 120
      },
      {
          "terrain": "ƽԭ��",
          "area": "����������ʩ����",
          "measure": "��ʱ��ʩ",
          "terrainid": 102,
          "areaid": 105,
          "measureid": 120
      },
      {
          "terrain": "ƽԭ��",
          "area": "����������ʩ����",
          "measure": "��ʱ��ʩ",
          "terrainid": 102,
          "areaid": 105,
          "measureid": 120
      },
      {
          "terrain": "ƽԭ��",
          "area": "ǣ�ų���",
          "measure": "���̴�ʩ",
          "terrainid": 102,
          "areaid": 106,
          "measureid": 119
      },
      {
          "terrain": "ƽԭ��",
          "area": "ǣ�ų���",
          "measure": "���̴�ʩ",
          "terrainid": 102,
          "areaid": 106,
          "measureid": 119
      },
      {
          "terrain": "ƽԭ��",
          "area": "ǣ�ų���",
          "measure": "ֲ����ʩ",
          "terrainid": 102,
          "areaid": 106,
          "measureid": 121
      },
      {
          "terrain": "ƽԭ��",
          "area": "ǣ�ų���",
          "measure": "��ʱ��ʩ",
          "terrainid": 102,
          "areaid": 106,
          "measureid": 120
      },
      {
          "terrain": "ƽԭ��",
          "area": "ǣ�ų���",
          "measure": "��ʱ��ʩ",
          "terrainid": 102,
          "areaid": 106,
          "measureid": 120
      },
      {
          "terrain": "ƽԭ��",
          "area": "ǣ�ų���",
          "measure": "��ʱ��ʩ",
          "terrainid": 102,
          "areaid": 106,
          "measureid": 120
      }
  ]

  return buildLayer(data, levels)
}






const flatTreeData = [
  {id: 1, parent: null, label: 'one'},
  {id: 2, parent: 1, label: 'two'},
  {id: 3, parent: 1, label: 'three'},
  {id: 4, parent: 1, label: 'four'},
  {id: 5, parent: 2, label: 'five'},
  {id: 6, parent: 2, label: 'six'},
  {id: 7, parent: 3, label: 'seven'},
  {id: 8, parent: 4, label: 'eight'}
]

function buildTree (flatData = [], options = { key: 'id', parentKey: 'parent' }) {
  const KEY = options.key
  const PARENT_KEY = options.parentKey

  function process (value) {
    const children = []
    for (let i = 0; i < flatData.length; i++) {
      const node = flatData[i]
      if (node[PARENT_KEY] === value) {
        children.push(Object.assign(Object.create(null), node, { children: process(node[KEY]) }))
      }
    }
    return children.length > 0 ? children : null
  }


  return flatData
    .filter(d => !d[PARENT_KEY])
    .map(d => Object.assign(Object.create(null), d, { children: process(d[KEY]) }))
}

function test () {
  buildTree(flatTreeData)
}
