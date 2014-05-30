'use strict';
require('should');
var File = require('gulp-util').File;
var _ = require('underscore');
var petrus = require('../index');

function streamCoverageResult(config, result) {
  var stream = petrus(config);

  stream.write(new File({
    path: './coverage-final.json',
    contents: result
  }));

  stream.end();
}

describe('Petrus', function() {
  var config;
  beforeEach(function() {
    config = {
      pattern: 'coverage-*.json',
      thresholds: {
        lines: 40,
        statements: 40,
        functions: 20,
        branches: 20
      }
    }
  });

  it('should do nothing if no threshold is broken', function() {
    (function() {
      streamCoverageResult(config, fullCoverage);
    }).should.not.throw();
  });

  it('should do nothing if perfect coverage is attained', function() {
    config.thresholds = _.extend(config.thresholds, { lines: 100, statements: 100, functions: 100, branches: 100 });

    (function() {
      streamCoverageResult(config, fullCoverage);
    }).should.not.throw();
  });

  it('should fail if the line coverage is below the threshold', function() {
    config.thresholds = _.extend(config.thresholds, { lines: 45.44 });

    (function() {
      streamCoverageResult(config, lowCoverage);
    }).should.throw('Coverage threshold(s) exceeded.');
  });

  it('should fail if the statement coverage is below the threshold', function() {
    config.thresholds = _.extend(config.thresholds, { statements: 100 });

    (function() {
      streamCoverageResult(config, lowCoverage);
    }).should.throw('Coverage threshold(s) exceeded.');
  });

  it('should fail if the function coverage is below the threshold', function() {
    config.thresholds = _.extend(config.thresholds, { functions: 100 });

    (function() {
      streamCoverageResult(config, lowCoverage);
    }).should.throw('Coverage threshold(s) exceeded.');
  });

  it('should fail if the branch coverage is below the threshold', function() {
    config.thresholds = _.extend(config.thresholds, { branches: 100 });

    (function() {
      streamCoverageResult(config, lowCoverage);
    }).should.throw('Coverage threshold(s) exceeded.');
  });

  it('should fail if multiple coverage metrics are below the threshold', function() {
    config.thresholds = _.extend(config.thresholds, { functions: 100, branches: 100 });

    (function() {
      streamCoverageResult(config, lowCoverage);
    }).should.throw('Coverage threshold(s) exceeded.');
  });

  it('should do nothing if no file matches the coverage file pattern', function() {
    var stream = petrus(_.extend(config, { pattern: 'non-existing.json' }));

    stream.write(new File({
      path: './coverage-final.json',
      contents: new Buffer(0)
    }));

    stream.end();
  });
});

var fullCoverage = new Buffer('{"./mxui/lib/form/FormFactory.js":{"path":"./mxui/lib/form/FormFactory.js","s":{"1":14,"2":1,"3":13,"4":13,"5":1,"6":2,"7":1,"8":1,"9":12,"10":1,"11":14,"12":14,"13":8,"14":8,"15":8,"16":8,"17":8,"18":8,"19":8,"20":8,"21":8,"22":8,"23":1,"24":1,"25":8,"26":8,"27":8,"28":14,"29":5,"30":5,"31":5,"32":5,"33":5,"34":5,"35":1,"36":1,"37":1,"38":5,"39":5,"40":5,"41":5,"42":5,"43":14},"b":{"1":[1,12],"2":[1,7],"3":[8,8],"4":[5,5]},"f":{"1":14,"2":13,"3":13,"4":2,"5":14,"6":8,"7":8,"8":1,"9":8,"10":5,"11":5,"12":1,"13":5},"fnMap":{"1":{"name":"(anonymous_1)","line":5,"loc":{"start":{"line":5,"column":3},"end":{"line":5,"column":116}}},"2":{"name":"loadPage","line":8,"loc":{"start":{"line":8,"column":4},"end":{"line":8,"column":45}}},"3":{"name":"(anonymous_3)","line":9,"loc":{"start":{"line":9,"column":31},"end":{"line":9,"column":46}}},"4":{"name":"(anonymous_4)","line":11,"loc":{"start":{"line":11,"column":63},"end":{"line":11,"column":83}}},"5":{"name":"FormFactory","line":20,"loc":{"start":{"line":20,"column":4},"end":{"line":20,"column":40}}},"6":{"name":"(anonymous_6)","line":24,"loc":{"start":{"line":24,"column":42},"end":{"line":24,"column":97}}},"7":{"name":"(anonymous_7)","line":27,"loc":{"start":{"line":27,"column":23},"end":{"line":27,"column":38}}},"8":{"name":"(anonymous_8)","line":50,"loc":{"start":{"line":50,"column":46},"end":{"line":50,"column":57}}},"9":{"name":"(anonymous_9)","line":55,"loc":{"start":{"line":55,"column":34},"end":{"line":55,"column":45}}},"10":{"name":"(anonymous_10)","line":62,"loc":{"start":{"line":62,"column":43},"end":{"line":62,"column":101}}},"11":{"name":"(anonymous_11)","line":63,"loc":{"start":{"line":63,"column":23},"end":{"line":63,"column":38}}},"12":{"name":"(anonymous_12)","line":70,"loc":{"start":{"line":70,"column":47},"end":{"line":70,"column":58}}},"13":{"name":"(anonymous_13)","line":76,"loc":{"start":{"line":76,"column":34},"end":{"line":76,"column":45}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":87,"column":3}},"2":{"start":{"line":8,"column":4},"end":{"line":18,"column":5}},"3":{"start":{"line":9,"column":8},"end":{"line":17,"column":18}},"4":{"start":{"line":10,"column":12},"end":{"line":16,"column":13}},"5":{"start":{"line":11,"column":16},"end":{"line":11,"column":113}},"6":{"start":{"line":11,"column":85},"end":{"line":11,"column":109}},"7":{"start":{"line":12,"column":16},"end":{"line":12,"column":52}},"8":{"start":{"line":13,"column":16},"end":{"line":13,"column":31}},"9":{"start":{"line":15,"column":16},"end":{"line":15,"column":84}},"10":{"start":{"line":20,"column":4},"end":{"line":22,"column":5}},"11":{"start":{"line":21,"column":8},"end":{"line":21,"column":44}},"12":{"start":{"line":24,"column":4},"end":{"line":60,"column":6}},"13":{"start":{"line":25,"column":8},"end":{"line":25,"column":24}},"14":{"start":{"line":27,"column":8},"end":{"line":59,"column":18}},"15":{"start":{"line":28,"column":12},"end":{"line":28,"column":96}},"16":{"start":{"line":30,"column":12},"end":{"line":43,"column":19}},"17":{"start":{"line":45,"column":12},"end":{"line":45,"column":75}},"18":{"start":{"line":46,"column":12},"end":{"line":46,"column":76}},"19":{"start":{"line":47,"column":12},"end":{"line":47,"column":83}},"20":{"start":{"line":48,"column":12},"end":{"line":48,"column":87}},"21":{"start":{"line":49,"column":12},"end":{"line":49,"column":83}},"22":{"start":{"line":50,"column":12},"end":{"line":53,"column":15}},"23":{"start":{"line":51,"column":16},"end":{"line":51,"column":35}},"24":{"start":{"line":52,"column":16},"end":{"line":52,"column":31}},"25":{"start":{"line":55,"column":12},"end":{"line":58,"column":15}},"26":{"start":{"line":56,"column":16},"end":{"line":56,"column":58}},"27":{"start":{"line":57,"column":16},"end":{"line":57,"column":43}},"28":{"start":{"line":62,"column":4},"end":{"line":84,"column":6}},"29":{"start":{"line":63,"column":8},"end":{"line":83,"column":18}},"30":{"start":{"line":64,"column":12},"end":{"line":64,"column":96}},"31":{"start":{"line":66,"column":12},"end":{"line":66,"column":93}},"32":{"start":{"line":67,"column":12},"end":{"line":67,"column":65}},"33":{"start":{"line":68,"column":12},"end":{"line":68,"column":46}},"34":{"start":{"line":70,"column":12},"end":{"line":74,"column":15}},"35":{"start":{"line":71,"column":16},"end":{"line":71,"column":36}},"36":{"start":{"line":72,"column":16},"end":{"line":72,"column":69}},"37":{"start":{"line":73,"column":16},"end":{"line":73,"column":35}},"38":{"start":{"line":76,"column":12},"end":{"line":82,"column":15}},"39":{"start":{"line":77,"column":16},"end":{"line":77,"column":36}},"40":{"start":{"line":78,"column":16},"end":{"line":78,"column":72}},"41":{"start":{"line":79,"column":16},"end":{"line":79,"column":35}},"42":{"start":{"line":81,"column":16},"end":{"line":81,"column":43}},"43":{"start":{"line":86,"column":4},"end":{"line":86,"column":23}}},"branchMap":{"1":{"line":10,"type":"if","locations":[{"start":{"line":10,"column":12},"end":{"line":10,"column":12}},{"start":{"line":10,"column":12},"end":{"line":10,"column":12}}]},"2":{"line":35,"type":"cond-expr","locations":[{"start":{"line":35,"column":53},"end":{"line":35,"column":67}},{"start":{"line":35,"column":70},"end":{"line":35,"column":74}}]},"3":{"line":57,"type":"binary-expr","locations":[{"start":{"line":57,"column":16},"end":{"line":57,"column":24}},{"start":{"line":57,"column":28},"end":{"line":57,"column":42}}]},"4":{"line":81,"type":"binary-expr","locations":[{"start":{"line":81,"column":16},"end":{"line":81,"column":24}},{"start":{"line":81,"column":28},"end":{"line":81,"column":42}}]}},"l":{"1":14,"8":1,"9":13,"10":13,"11":2,"12":1,"13":1,"15":12,"20":1,"21":14,"24":14,"25":8,"27":8,"28":8,"30":8,"45":8,"46":8,"47":8,"48":8,"49":8,"50":8,"51":1,"52":1,"55":8,"56":8,"57":8,"62":14,"63":5,"64":5,"66":5,"67":5,"68":5,"70":5,"71":1,"72":1,"73":1,"76":5,"77":5,"78":5,"79":5,"81":5,"86":14}}}');

// l: 44.44, s: 43.48, f: 26.92, b: 28.57
var lowCoverage = new Buffer('{"./poorFile.js":{"path":"./poorFile.js","s":{"1":3,"2":3,"3":30,"4":30,"5":30,"6":28,"7":28,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":1,"17":1,"18":1,"19":1,"20":2,"21":2,"22":1,"23":0,"24":2,"25":2,"26":2,"27":0,"28":0,"29":0,"30":0,"31":0,"32":0,"33":0,"34":0,"35":0,"36":0,"37":0,"38":1,"39":1,"40":0,"41":0,"42":0,"43":0,"44":0,"45":0,"46":3},"b":{"1":[1,0],"2":[0,0],"3":[2,1],"4":[0,0],"5":[0,0],"6":[1,0],"7":[0,0]},"f":{"1":3,"2":30,"3":28,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":1,"16":2,"17":2,"18":0,"19":0,"20":0,"21":0,"22":0,"23":1,"24":0,"25":0,"26":0},"fnMap":{"1":{"name":"(anonymous_1)","line":5,"loc":{"start":{"line":5,"column":3},"end":{"line":5,"column":82}}},"2":{"name":"(anonymous_2)","line":20,"loc":{"start":{"line":20,"column":21},"end":{"line":20,"column":32}}},"3":{"name":"(anonymous_3)","line":26,"loc":{"start":{"line":26,"column":20},"end":{"line":26,"column":31}}},"4":{"name":"(anonymous_4)","line":31,"loc":{"start":{"line":31,"column":18},"end":{"line":31,"column":29}}},"5":{"name":"(anonymous_5)","line":35,"loc":{"start":{"line":35,"column":16},"end":{"line":35,"column":27}}},"6":{"name":"(anonymous_6)","line":39,"loc":{"start":{"line":39,"column":17},"end":{"line":39,"column":28}}},"7":{"name":"(anonymous_7)","line":42,"loc":{"start":{"line":42,"column":22},"end":{"line":42,"column":33}}},"8":{"name":"(anonymous_8)","line":45,"loc":{"start":{"line":45,"column":22},"end":{"line":45,"column":33}}},"9":{"name":"(anonymous_9)","line":48,"loc":{"start":{"line":48,"column":21},"end":{"line":48,"column":32}}},"10":{"name":"(anonymous_10)","line":51,"loc":{"start":{"line":51,"column":21},"end":{"line":51,"column":32}}},"11":{"name":"(anonymous_11)","line":54,"loc":{"start":{"line":54,"column":18},"end":{"line":54,"column":44}}},"12":{"name":"(anonymous_12)","line":57,"loc":{"start":{"line":57,"column":14},"end":{"line":57,"column":40}}},"13":{"name":"(anonymous_13)","line":60,"loc":{"start":{"line":60,"column":16},"end":{"line":60,"column":42}}},"14":{"name":"(anonymous_14)","line":63,"loc":{"start":{"line":63,"column":18},"end":{"line":63,"column":44}}},"15":{"name":"(anonymous_15)","line":68,"loc":{"start":{"line":68,"column":17},"end":{"line":68,"column":52}}},"16":{"name":"(anonymous_16)","line":78,"loc":{"start":{"line":78,"column":51},"end":{"line":78,"column":72}}},"17":{"name":"(anonymous_17)","line":88,"loc":{"start":{"line":88,"column":16},"end":{"line":88,"column":44}}},"18":{"name":"(anonymous_18)","line":95,"loc":{"start":{"line":95,"column":18},"end":{"line":95,"column":36}}},"19":{"name":"(anonymous_19)","line":109,"loc":{"start":{"line":109,"column":22},"end":{"line":109,"column":37}}},"20":{"name":"(anonymous_20)","line":112,"loc":{"start":{"line":112,"column":20},"end":{"line":112,"column":35}}},"21":{"name":"(anonymous_21)","line":118,"loc":{"start":{"line":118,"column":24},"end":{"line":118,"column":38}}},"22":{"name":"(anonymous_22)","line":122,"loc":{"start":{"line":122,"column":24},"end":{"line":122,"column":45}}},"23":{"name":"(anonymous_23)","line":126,"loc":{"start":{"line":126,"column":21},"end":{"line":126,"column":38}}},"24":{"name":"(anonymous_24)","line":133,"loc":{"start":{"line":133,"column":23},"end":{"line":133,"column":55}}},"25":{"name":"(anonymous_25)","line":141,"loc":{"start":{"line":141,"column":16},"end":{"line":141,"column":27}}},"26":{"name":"(anonymous_26)","line":144,"loc":{"start":{"line":144,"column":17},"end":{"line":144,"column":28}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":150,"column":3}},"2":{"start":{"line":8,"column":4},"end":{"line":147,"column":7}},"3":{"start":{"line":21,"column":12},"end":{"line":21,"column":41}},"4":{"start":{"line":22,"column":12},"end":{"line":22,"column":33}},"5":{"start":{"line":23,"column":12},"end":{"line":23,"column":31}},"6":{"start":{"line":27,"column":12},"end":{"line":27,"column":39}},"7":{"start":{"line":28,"column":12},"end":{"line":28,"column":45}},"8":{"start":{"line":32,"column":12},"end":{"line":32,"column":30}},"9":{"start":{"line":36,"column":12},"end":{"line":36,"column":92}},"10":{"start":{"line":43,"column":12},"end":{"line":43,"column":26}},"11":{"start":{"line":49,"column":12},"end":{"line":49,"column":38}},"12":{"start":{"line":55,"column":12},"end":{"line":55,"column":54}},"13":{"start":{"line":58,"column":12},"end":{"line":58,"column":50}},"14":{"start":{"line":61,"column":12},"end":{"line":61,"column":52}},"15":{"start":{"line":64,"column":12},"end":{"line":64,"column":54}},"16":{"start":{"line":69,"column":12},"end":{"line":69,"column":48}},"17":{"start":{"line":71,"column":12},"end":{"line":86,"column":13}},"18":{"start":{"line":72,"column":16},"end":{"line":72,"column":31}},"19":{"start":{"line":74,"column":16},"end":{"line":81,"column":17}},"20":{"start":{"line":78,"column":20},"end":{"line":80,"column":36}},"21":{"start":{"line":79,"column":24},"end":{"line":79,"column":42}},"22":{"start":{"line":83,"column":16},"end":{"line":83,"column":47}},"23":{"start":{"line":85,"column":16},"end":{"line":85,"column":39}},"24":{"start":{"line":89,"column":12},"end":{"line":90,"column":83}},"25":{"start":{"line":92,"column":12},"end":{"line":92,"column":33}},"26":{"start":{"line":93,"column":12},"end":{"line":93,"column":36}},"27":{"start":{"line":96,"column":12},"end":{"line":98,"column":44}},"28":{"start":{"line":100,"column":12},"end":{"line":105,"column":13}},"29":{"start":{"line":101,"column":16},"end":{"line":101,"column":33}},"30":{"start":{"line":103,"column":16},"end":{"line":103,"column":43}},"31":{"start":{"line":103,"column":36},"end":{"line":103,"column":43}},"32":{"start":{"line":104,"column":16},"end":{"line":104,"column":44}},"33":{"start":{"line":110,"column":12},"end":{"line":110,"column":35}},"34":{"start":{"line":113,"column":12},"end":{"line":115,"column":13}},"35":{"start":{"line":114,"column":16},"end":{"line":114,"column":31}},"36":{"start":{"line":119,"column":12},"end":{"line":119,"column":38}},"37":{"start":{"line":123,"column":12},"end":{"line":123,"column":39}},"38":{"start":{"line":127,"column":12},"end":{"line":131,"column":13}},"39":{"start":{"line":128,"column":16},"end":{"line":128,"column":87}},"40":{"start":{"line":130,"column":16},"end":{"line":130,"column":63}},"41":{"start":{"line":134,"column":12},"end":{"line":135,"column":64}},"42":{"start":{"line":137,"column":12},"end":{"line":139,"column":13}},"43":{"start":{"line":138,"column":16},"end":{"line":138,"column":66}},"44":{"start":{"line":142,"column":12},"end":{"line":142,"column":56}},"45":{"start":{"line":145,"column":12},"end":{"line":145,"column":57}},"46":{"start":{"line":149,"column":4},"end":{"line":149,"column":21}}},"branchMap":{"1":{"line":71,"type":"if","locations":[{"start":{"line":71,"column":12},"end":{"line":71,"column":12}},{"start":{"line":71,"column":12},"end":{"line":71,"column":12}}]},"2":{"line":85,"type":"binary-expr","locations":[{"start":{"line":85,"column":16},"end":{"line":85,"column":24}},{"start":{"line":85,"column":28},"end":{"line":85,"column":38}}]},"3":{"line":90,"type":"binary-expr","locations":[{"start":{"line":90,"column":23},"end":{"line":90,"column":47}},{"start":{"line":90,"column":52},"end":{"line":90,"column":81}}]},"4":{"line":100,"type":"if","locations":[{"start":{"line":100,"column":12},"end":{"line":100,"column":12}},{"start":{"line":100,"column":12},"end":{"line":100,"column":12}}]},"5":{"line":113,"type":"if","locations":[{"start":{"line":113,"column":12},"end":{"line":113,"column":12}},{"start":{"line":113,"column":12},"end":{"line":113,"column":12}}]},"6":{"line":127,"type":"if","locations":[{"start":{"line":127,"column":12},"end":{"line":127,"column":12}},{"start":{"line":127,"column":12},"end":{"line":127,"column":12}}]},"7":{"line":138,"type":"binary-expr","locations":[{"start":{"line":138,"column":16},"end":{"line":138,"column":29}},{"start":{"line":138,"column":33},"end":{"line":138,"column":65}}]}},"l":{"1":3,"8":3,"21":30,"22":30,"23":30,"27":28,"28":28,"32":0,"36":0,"43":0,"49":0,"55":0,"58":0,"61":0,"64":0,"69":1,"71":1,"72":1,"74":1,"78":2,"79":2,"83":1,"85":0,"89":2,"92":2,"93":2,"96":0,"100":0,"101":0,"103":0,"104":0,"110":0,"113":0,"114":0,"119":0,"123":0,"127":1,"128":1,"130":0,"134":0,"137":0,"138":0,"142":0,"145":0,"149":3}}}');