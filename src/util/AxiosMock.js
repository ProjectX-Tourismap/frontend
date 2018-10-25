import axios from 'axios';
import AxiosMock from 'axios-mock-adapter';

/* eslint-disable */
const nearEntitiesInPointMockData = {"mock": true, "data":{"nearEntitiesInPoint":[{"categoryId":"1852ed1e9b6d12c23cd34e79a4be4c71","id":"106257","name":"JANICE WONG","desc":"JANICE WONGはこれまで味わったことのないような、様々な食感、味覚、温度の組合せで新しいデザート体験をお届けします。","picture":"https://cdn-rs.ikyu.com/rsDatas/rsData106500/r106257/106257ga10000052.jpg","geo":{"lat":35.6888458,"lng":139.701054}},{"categoryId":"a6e27b84663abc4336dc275c6fb7f978","id":"g914011","name":"ROSEMARY’S TOKYO","desc":null,"picture":"http://uds.gnst.jp/rest/img/8munfpug0000/s_0n8d.jpg","geo":{"lat":35.68876269,"lng":139.70129386}},{"categoryId":"d5f0deed2aa10ce90e86a7f4d846b513","id":"110611","name":"証明写真機 新宿南","desc":null,"picture":"https://iwiz-olp.c.yimg.jp/c/olp/55/d5f0deed2aa10ce90e86a7f4d846b513/image/5f/27/ND01QR.gif","geo":{"lat":35.689734,"lng":139.700947}},{"categoryId":"132c700e0ebf5a1d386e9b725d7d1e6b","id":"t000254027","name":"結婚相談　ブライダルオアシス","desc":"♪　詳細資料を無料でご郵送しています　♪","picture":"http://tenpo.west.edge.storage-yahoo.jp/tenpo-t000254027-release/loco_image","geo":{"lat":35.6885942,"lng":139.699724}},{"categoryId":"1852ed1e9b6d12c23cd34e79a4be4c71","id":"109644","name":"宮崎風土 くわんね","desc":"まだまだ埋もれている宮崎県の食材と生産者さんをまだ宮崎を知らないお客様に伝え、宮崎の食文化の伝道師となる事を目指しております。","picture":"https://cdn-rs.ikyu.com/rsDatas/rsData110000/r109644/109644ga10000013.jpg","geo":{"lat":35.6882913,"lng":139.700018}},{"categoryId":"a6e27b84663abc4336dc275c6fb7f978","id":"g112357","name":"讃岐うどん おごっと新宿南口店","desc":null,"picture":"http://uds.gnst.jp/rest/img/nfk4695u0000/s_002j.JPG","geo":{"lat":35.68851823,"lng":139.69967457}},{"categoryId":"1852ed1e9b6d12c23cd34e79a4be4c71","id":"109912","name":"銀波－GINPA－ 新宿東口店","desc":"新宿南口・東口徒歩2分、和食とワインを愉しめるダイニング空間。旬の素材を贅沢に使った職人が手掛ける自慢の手作り創作和食とワインを堪能下さい。","picture":"https://cdn-rs.ikyu.com/rsDatas/rsData110000/r109912/109912ga10000028.jpg","geo":{"lat":35.690374,"lng":139.70138}},{"categoryId":"a6e27b84663abc4336dc275c6fb7f978","id":"g068219","name":"響 新宿NOWAビル店","desc":null,"picture":"http://uds.gnst.jp/rest/img/f6aygxwx0000/s_00k6.jpg","geo":{"lat":35.69040972,"lng":139.70130769}},{"categoryId":"a6e27b84663abc4336dc275c6fb7f978","id":"g385020","name":"DANCING CRAB 東京 【ダンシング クラブ】","desc":null,"picture":"http://uds.gnst.jp/rest/img/j1sc3ybh0000/s_003s.jpg","geo":{"lat":35.69040972,"lng":139.70130769}},{"categoryId":"a6e27b84663abc4336dc275c6fb7f978","id":"a777200","name":"キリンシティプラス 新宿東南口","desc":null,"picture":"http://uds.gnst.jp/rest/img/cv3y2nex0000/s_00hh.jpg","geo":{"lat":35.69040972,"lng":139.70130769}},{"categoryId":"0","id":"1463001","name":"埼玉県深谷市の消火栓用マンホール","desc":"深谷市の木「椿」と、当時の士の花「福寿草」がデザインされています。現在の市の","picture":"http://manholemap.juge.me/get?id=1463001","geo":{"lat":35.69060134887695,"lng":139.6999969482422}},{"categoryId":"0","id":"4585390480481405400","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=4585390480481405400","geo":{"lat":35.69060134887695,"lng":139.6999969482422}},{"categoryId":"0","id":"1819006","name":"こちらもワルシャワ空港にて撮影","desc":"","picture":"http://manholemap.juge.me/get?id=1819006","geo":{"lat":35.69060134887695,"lng":139.6999969482422}},{"categoryId":"0","id":"5787005790174594000","name":"小諸市の展示カラーマンホール","desc":"小諸市浄化管理センターにて撮影。","picture":"http://manholemap.juge.me/get?id=5787005790174594000","geo":{"lat":35.69060134887695,"lng":139.6999969482422}},{"categoryId":"0","id":"419150049135212300","name":"池田町の農集排の展示色蓋","desc":"","picture":"http://manholemap.juge.me/get?id=419150049135212300","geo":{"lat":35.69060134887695,"lng":139.6999969482422}},{"categoryId":"0","id":"3545479070620336600","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=3545479070620336600","geo":{"lat":35.69060134887695,"lng":139.6999969482422}},{"categoryId":"0","id":"8014413771755075000","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=8014413771755075000","geo":{"lat":35.69060134887695,"lng":139.6999969482422}},{"categoryId":"0","id":"2042148580287953000","name":"工水泥吐室","desc":"東京都北区神谷３丁目２番地付近","picture":"http://manholemap.juge.me/get?id=2042148580287953000","geo":{"lat":35.69060134887695,"lng":139.6999969482422}},{"categoryId":"0","id":"7335676001397066000","name":"小布施町のマンホール","desc":"","picture":"http://manholemap.juge.me/get?id=7335676001397066000","geo":{"lat":35.69060134887695,"lng":139.6999969482422}},{"categoryId":"0","id":"2518057388080055300","name":"小布施町のマンホール2","desc":"","picture":"http://manholemap.juge.me/get?id=2518057388080055300","geo":{"lat":35.69060134887695,"lng":139.6999969482422}},{"categoryId":"0","id":"805581665925350400","name":"大洗駅前","desc":"なぜか白い丸が…","picture":"http://manholemap.juge.me/get?id=805581665925350400","geo":{"lat":35.69060134887695,"lng":139.6999969482422}},{"categoryId":"0","id":"1822002","name":"ワルシャワ空港にて撮影","desc":"","picture":"http://manholemap.juge.me/get?id=1822002","geo":{"lat":35.69060134887695,"lng":139.6999969482422}},{"categoryId":"0","id":"7620589808825880000","name":"道の真ん中にあるのですっかり文字が","desc":"すり減った先ほどの物と同じ制水弁。\n味のあるいい雰囲気になりました。","picture":"http://manholemap.juge.me/get?id=7620589808825880000","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"7086568944211965000","name":"築50年近い団地の中に創建当時から","desc":"あると思われる制水弁。筆文字のような\n表記が味わい深いです。","picture":"http://manholemap.juge.me/get?id=7086568944211965000","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"4537742592555370500","name":"先ほどの物より以前のデザイン？","desc":"真ん中の「三本線を包み込む」マークは\n加古川市市章。\n「川を中心に発展していく」意味だそうです。","picture":"http://manholemap.juge.me/get?id=4537742592555370500","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"2951927191649010700","name":"地元加古川市の下水道用マンホール","desc":"\n市花の「つつじ」がデザインされた\n素朴だけど可愛らしく親しみやすいデザインだと思います。","picture":"http://manholemap.juge.me/get?id=2951927191649010700","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"6828430965207380000","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=6828430965207380000","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"5287620707634790000","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=5287620707634790000","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"1890465234882612000","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=1890465234882612000","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"8858895881980168000","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=8858895881980168000","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"8828754177026474000","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=8828754177026474000","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"417342680823214140","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=417342680823214140","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"6387416931890317000","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=6387416931890317000","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"7623466617215172000","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=7623466617215172000","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"4507469196352635400","name":"八坂神社の神輿","desc":"","picture":"http://manholemap.juge.me/get?id=4507469196352635400","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"2901431781084739600","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=2901431781084739600","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"4057400908483151400","name":"これ書きましたhttp:","desc":"/mrs.living.jp/kashiwa/town_news/article/2551948","picture":"http://manholemap.juge.me/get?id=4057400908483151400","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"4036935555618486300","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=4036935555618486300","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"7905828815403830000","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=7905828815403830000","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"3965806191293973000","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=3965806191293973000","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"6037755958187048000","name":"これ書きましたhttp:","desc":"/mrs.living.jp/kashiwa/town_news/article/2551948","picture":"http://manholemap.juge.me/get?id=6037755958187048000","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"3091130315975932000","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=3091130315975932000","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"577356530091409200","name":"これ書きましたhttp:","desc":"/mrs.living.jp/kashiwa/town_news/article/2551948","picture":"http://manholemap.juge.me/get?id=577356530091409200","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"7078707598504774000","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=7078707598504774000","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"8245266886232554000","name":"太閤の街","desc":"","picture":"http://manholemap.juge.me/get?id=8245266886232554000","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"5394969523646973000","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=5394969523646973000","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"3662100910616235500","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=3662100910616235500","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"5501516471506286000","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=5501516471506286000","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"725752242809291100","name":"東欧スロバキアのマンホール","desc":"","picture":"http://manholemap.juge.me/get?id=725752242809291100","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"8614504575977803000","name":"栃木県那須烏山市（旧烏山町）","desc":"","picture":"http://manholemap.juge.me/get?id=8614504575977803000","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"574044779092751940","name":"権限で使う為開けた","desc":"","picture":"http://manholemap.juge.me/get?id=574044779092751940","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"4703156690230398000","name":"最近","desc":"所沢駅前のプロぺ通りに現れたマスコット「トコろん」のマンホール。可愛いですよ！","picture":"http://manholemap.juge.me/get?id=4703156690230398000","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"5522623637718322000","name":"神戸市垂水区第1回デザインマンホールコンテスト最優秀","desc":"","picture":"http://manholemap.juge.me/get?id=5522623637718322000","geo":{"lat":35.690625,"lng":139.699788}},{"categoryId":"0","id":"636930211029471200","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=636930211029471200","geo":{"lat":35.69062423706055,"lng":139.6997833251953}},{"categoryId":"0","id":"3040571218768710000","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=3040571218768710000","geo":{"lat":35.69062423706055,"lng":139.6997833251953}},{"categoryId":"0","id":"1698007","name":"2011","desc":"05.03大磯小","picture":"http://manholemap.juge.me/get?id=1698007","geo":{"lat":35.69300079345703,"lng":139.70199584960938}},{"categoryId":"0","id":"3476081324931855400","name":"京王電鉄の角蓋","desc":"東京都渋谷区代々木3丁目24","picture":"http://manholemap.juge.me/get?id=3476081324931855400","geo":{"lat":35.68538942903773,"lng":139.69300771692906}},{"categoryId":"0","id":"1448001","name":"京王帝都時代の社章入りマンホ","desc":"旧軌道敷の上、この下を電車が走っているのか？","picture":"http://manholemap.juge.me/get?id=1448001","geo":{"lat":35.68519973754883,"lng":139.6929931640625}},{"categoryId":"0","id":"103399986737465760","name":"千駄ヶ谷に有る鳩森小学校の前に","desc":"有るマンホール。真ん中のデザインは鳩のように見える。この小学校独自の専用のマンホールかもしれない。","picture":"http://manholemap.juge.me/get?id=103399986737465760","geo":{"lat":35.68239974975586,"lng":139.70599365234375}},{"categoryId":"0","id":"7341378074913559000","name":"明治神宮北参道の鳥居の裏にある雨水枡のふた","desc":"","picture":"http://manholemap.juge.me/get?id=7341378074913559000","geo":{"lat":35.67920833333333,"lng":139.70224166666665}},{"categoryId":"0","id":"4818946455444865000","name":"千駄ヶ谷2丁目の燈孔蓋","desc":"","picture":"http://manholemap.juge.me/get?id=4818946455444865000","geo":{"lat":35.674994999999996,"lng":139.70961}},{"categoryId":"0","id":"3830926668892491000","name":"泥吐枡（萌え点つき）","desc":"東京市時代のものか？","picture":"http://manholemap.juge.me/get?id=3830926668892491000","geo":{"lat":35.69269943237305,"lng":139.7220001220703}},{"categoryId":"0","id":"7265387678079959000","name":"排水弇","desc":"鉄枠付き","picture":"http://manholemap.juge.me/get?id=7265387678079959000","geo":{"lat":35.68470001220703,"lng":139.72500610351562}},{"categoryId":"0","id":"7080055526460113000","name":"イチョウ並木で有名な明治神宮外苑の燈光蓋","desc":"","picture":"http://manholemap.juge.me/get?id=7080055526460113000","geo":{"lat":35.67514166666666,"lng":139.71928333333332}},{"categoryId":"0","id":"3917383254836396500","name":"神宮外苑の側溝蓋","desc":"港区の花「バラ」のデザインかな？","picture":"http://manholemap.juge.me/get?id=3917383254836396500","geo":{"lat":35.671199798583984,"lng":139.7209930419922}},{"categoryId":"0","id":"1632005","name":"なぜか新宿区にある立川市の蓋","desc":"","picture":"http://manholemap.juge.me/get?id=1632005","geo":{"lat":35.700801849365234,"lng":139.72799682617188}},{"categoryId":"0","id":"8164540914149967000","name":"東京によくある下水マークのマンホールのカラー下水マークマンホール","desc":"これ見たのは初めてです。","picture":"http://manholemap.juge.me/get?id=8164540914149967000","geo":{"lat":35.66389846801758,"lng":139.6999969482422}},{"categoryId":"0","id":"9064770350077657000","name":"鍋屋横丁入り口","desc":"おかしのまちおか前に ソレはある。","picture":"http://manholemap.juge.me/get?id=9064770350077657000","geo":{"lat":35.6976470947266,"lng":139.670888764699}},{"categoryId":"0","id":"5289464389876926000","name":"鍋屋横丁入り口","desc":"おかしのまちおか前に ソレはある！","picture":"http://manholemap.juge.me/get?id=5289464389876926000","geo":{"lat":35.6976318359375,"lng":139.670837402344}},{"categoryId":"0","id":"5246320608398848000","name":"渋谷","desc":"","picture":"http://manholemap.juge.me/get?id=5246320608398848000","geo":{"lat":35.66347222222222,"lng":139.6954638888889}},{"categoryId":"0","id":"3429800672798227000","name":"瓦斯","desc":"\n","picture":"http://manholemap.juge.me/get?id=3429800672798227000","geo":{"lat":35.700575,"lng":139.73008}},{"categoryId":"0","id":"8525773336587320000","name":"ここにもある東京府のコンクリート蓋","desc":"笹塚近くの都道420　中野通","picture":"http://manholemap.juge.me/get?id=8525773336587320000","geo":{"lat":35.67666208523492,"lng":139.67048382010398}},{"categoryId":"0","id":"5208420741101827000","name":"赤坂御所周囲の","desc":"舗装し直されたランニングコースで発見。東京のソメイヨシノ模様とはちと違う？","picture":"http://manholemap.juge.me/get?id=5208420741101827000","geo":{"lat":35.67796666666666,"lng":139.7322388888889}},{"categoryId":"0","id":"659357651595473900","name":"国道20号線（甲州街道）幡ヶ谷陸橋真下の笹塚交差点の車道内に東京府マンホールが存在しますが","desc":"絶えず車が通るので非常に危険です。","picture":"http://manholemap.juge.me/get?id=659357651595473900","geo":{"lat":35.67539978027344,"lng":139.67100524902344}},{"categoryId":"0","id":"520219723974817200","name":"渋谷センター街","desc":"","picture":"http://manholemap.juge.me/get?id=520219723974817200","geo":{"lat":35.6609992980957,"lng":139.697998046875}},{"categoryId":"0","id":"1632018","name":"東京都？の名古屋型の鉄蓋","desc":"そんなに古そうには見えないのだが。","picture":"http://manholemap.juge.me/get?id=1632018","geo":{"lat":35.699798583984375,"lng":139.73300170898438}},{"categoryId":"0","id":"8915646510728002000","name":"丸ノ内線","desc":"新中野下車 鍋横通り入り口 おかしのまちおか前。なり。","picture":"http://manholemap.juge.me/get?id=8915646510728002000","geo":{"lat":35.6973266601562,"lng":139.667541503906}},{"categoryId":"0","id":"1634644252176724500","name":"日本水道協会近くで営団地下鉄マークを発見！","desc":"","picture":"http://manholemap.juge.me/get?id=1634644252176724500","geo":{"lat":35.690825415660505,"lng":139.73663082302858}},{"categoryId":"0","id":"725162810620490000","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=725162810620490000","geo":{"lat":35.6595306396484,"lng":139.700622558594}},{"categoryId":"0","id":"1467314813575741200","name":"渋谷宮益坂","desc":"センタースポーツや今岡ジムのあるビルの擬似蓋","picture":"http://manholemap.juge.me/get?id=1467314813575741200","geo":{"lat":35.65954576802765,"lng":139.70312466801454}},{"categoryId":"0","id":"5160789789566519000","name":"東京都中野区南台4丁目30番","desc":"","picture":"http://manholemap.juge.me/get?id=5160789789566519000","geo":{"lat":35.679241463870156,"lng":139.66652853174844}},{"categoryId":"0","id":"8249791596113447000","name":"Manhole","desc":"","picture":"http://manholemap.juge.me/get?id=8249791596113447000","geo":{"lat":35.659423828125,"lng":139.700317382812}},{"categoryId":"0","id":"3138470668305349600","name":"東京ガスのおにぎり蓋","desc":"","picture":"http://manholemap.juge.me/get?id=3138470668305349600","geo":{"lat":35.682899475097656,"lng":139.73699951171875}},{"categoryId":"0","id":"3789049272295932000","name":"テスト","desc":"","picture":"http://manholemap.juge.me/get?id=3789049272295932000","geo":{"lat":35.6839752197266,"lng":139.738586425781}},{"categoryId":"0","id":"1561010","name":"道玄坂の「犬・縁・坂」","desc":"","picture":"http://manholemap.juge.me/get?id=1561010","geo":{"lat":35.65800094604492,"lng":139.69700622558594}},{"categoryId":"0","id":"7188048222245307000","name":"渋谷の某薬局の前の車道にこんな大きな四角いマンホールを見つけました","desc":"2ｍ角くらいでしょうか？？模様はめっちゃすべり止め効いていました。どうやって開けるのだろう。。","picture":"http://manholemap.juge.me/get?id=7188048222245307000","geo":{"lat":35.65736518017637,"lng":139.7015786147871}},{"categoryId":"0","id":"1576004","name":"笹塚駅前にあった孔のない側溝蓋","desc":"南ドンドン橋の親柱が目印","picture":"http://manholemap.juge.me/get?id=1576004","geo":{"lat":35.673301696777344,"lng":139.66700744628906}},{"categoryId":"0","id":"3891713453418526000","name":"東京大学駒場の","desc":"守衛室裏のマンホール蓋。通信系と思われるが、電電公社のマークの\n左右出っ張り部分がきれいに無くなっている変わったマーク。","picture":"http://manholemap.juge.me/get?id=3891713453418526000","geo":{"lat":35.663433513048616,"lng":139.6774720209961}},{"categoryId":"0","id":"7219552380046982000","name":"赤坂サカス近く","desc":"一ツ木通りの半円蓋","picture":"http://manholemap.juge.me/get?id=7219552380046982000","geo":{"lat":35.67476666666666,"lng":139.7361}},{"categoryId":"0","id":"8641559887755430000","name":"右書きで航空研究所","desc":"棟の周りに何枚かある。コンクリート枠付きはこれだけ？","picture":"http://manholemap.juge.me/get?id=8641559887755430000","geo":{"lat":35.662627213776304,"lng":139.67741033018876}},{"categoryId":"0","id":"2008512366869235500","name":"赤坂サカス近くの消化栓","desc":"","picture":"http://manholemap.juge.me/get?id=2008512366869235500","geo":{"lat":35.67397777777778,"lng":139.73666388888887}},{"categoryId":"0","id":"3419871233659223600","name":"神楽坂で見つけたダイヤ穴コンクリート蓋","desc":"","picture":"http://manholemap.juge.me/get?id=3419871233659223600","geo":{"lat":35.699798583984375,"lng":139.74000549316406}},{"categoryId":"0","id":"3720404881391795700","name":"渋谷川沿い","desc":"並木橋交差点近くの児童公園で見つけた渋谷区章マンホール","picture":"http://manholemap.juge.me/get?id=3720404881391795700","geo":{"lat":35.654835,"lng":139.70616}},{"categoryId":"0","id":"2017493984816967700","name":"東京大学駒場キャンパスの","desc":"生産技術研究所S棟前のマンホール。地中送電線六萬ボルト","picture":"http://manholemap.juge.me/get?id=2017493984816967700","geo":{"lat":35.66007315260844,"lng":139.67731645287324}},{"categoryId":"0","id":"5508995038189629000","name":"かなり古そうな","desc":"制水弁 いつ頃のモノかわかる方 情報下さーい！","picture":"http://manholemap.juge.me/get?id=5508995038189629000","geo":{"lat":35.69775390625,"lng":139.658508300781}},{"categoryId":"0","id":"5661800027964749000","name":"「杉並区","desc":"二級基準点　測量」","picture":"http://manholemap.juge.me/get?id=5661800027964749000","geo":{"lat":35.67399997222222,"lng":139.6609999722222}},{"categoryId":"0","id":"2697122250034167300","name":"市電燈NO","desc":"","picture":"http://manholemap.juge.me/get?id=2697122250034167300","geo":{"lat":35.66210174560547,"lng":139.7310028076172}},{"categoryId":"0","id":"4723274630076742000","name":"透け透けの番号キャップ付きマンホール蓋","desc":"略して「透け番ホール」","picture":"http://manholemap.juge.me/get?id=4723274630076742000","geo":{"lat":35.656314849853516,"lng":139.72280883789062}},{"categoryId":"0","id":"4236489942197620700","name":"桜と","desc":"桜坂と、桜マンホール","picture":"http://manholemap.juge.me/get?id=4236489942197620700","geo":{"lat":35.66849899291992,"lng":139.74166870117188}},{"categoryId":"0","id":"8556958523876134000","name":"レベル３というアメリカの長距離データ通信会社のマンホール","desc":"","picture":"http://manholemap.juge.me/get?id=8556958523876134000","geo":{"lat":35.66360092163086,"lng":139.74000549316406}}]}};
/* eslint-enable */

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable-next-line */
  console.info('%cNow use AxiosMock!', 'color: red;');
  const mock = new AxiosMock(axios);

  mock.onGet().reply((config) => {
    const { query } = config.params;
    const queryName = query.substring(1, query.indexOf('('));
    if (queryName === 'nearEntitiesInPoint') return [200, nearEntitiesInPointMockData];
    return [500];
  });
}

export default axios;