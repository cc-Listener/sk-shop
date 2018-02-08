/*
Navicat MySQL Data Transfer

Source Server         : project
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : sk-shop

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-02-08 19:01:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for big
-- ----------------------------
DROP TABLE IF EXISTS `big`;
CREATE TABLE `big` (
  `id` int(11) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `pageid` varchar(255) DEFAULT NULL,
  `floors` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of big
-- ----------------------------
INSERT INTO `big` VALUES ('19946', 'big/00f65f1d93a54caf8f1cc4115d4aee56.jpg', 'topicNew/19946', '4,6,8,10,12,14,16,18,20,22,24,27,29,31,33,35,37,39,41');
INSERT INTO `big` VALUES ('21743', 'big/2fba2d2d5d31431c8984f3f4014203cb.jpg', 'topicNew/21743', '3,5,12,14,16,18,20,22,24,26,28,30');
INSERT INTO `big` VALUES ('21884', 'big/e17173579a4a467b9e5e19a3d0955dcb.jpg', 'topicNew/21884', '8,9,10,11,12,13,14,15,16,17,18,19,20,21,22');
INSERT INTO `big` VALUES ('22397', 'big/7d65b558f15a4decb883b18353956011.jpg', 'topicNew/22397', '3,4,5,6,7,8,9,10,11');
INSERT INTO `big` VALUES ('22665', 'big/2c6bceff2fd74ae7a472f2d0286e7b2e.jpg', 'topicNew/22665', '2,3,4,5,6,7,8,9,10,11,12,13,14');
INSERT INTO `big` VALUES ('22680', 'big/de7876887fed426497f358ddf4d152a0.jpg', 'topicNew/22680', '18,20,26,27,28,29,30,31,32,33,34,35');
INSERT INTO `big` VALUES ('22702', 'big/e2987f1167a54c8fa0ac42ebec58cf18.jpg', 'topicNew/22702', '2,3,4,5');
INSERT INTO `big` VALUES ('22792', 'big/05c61ad1b0b84fc8a460dd2df1201c9f.jpg', 'topicNew/22792', '51,53,55,57,59');
INSERT INTO `big` VALUES ('22945', 'big/d8ce5b98e8f44215ad37da67d52c01a1.jpg', 'topicNew/22945', '4,6,8,10,13,15,17,19,21');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subTitle` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `pageid` varchar(255) DEFAULT NULL,
  `floors` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('14615', '腕表', 'Watches', 'category/f15bbf29633e49b688700b3a6d0b94ed.jpg', 'topicNew/14615', '3,5,7,15,16');
INSERT INTO `category` VALUES ('14616', '珠宝首饰', 'Jewelry', 'category/6be7e272906c47538c35e5e0d67c996e.jpg', 'topicNew/14616', '4,17,18,19,20');
INSERT INTO `category` VALUES ('14622', '美妆', 'Beauty', 'category/885ab1ee35fe4686bfcbf1ef5af64a03.jpg', 'topicNew/14622', '3,5,7,9,11,21');
INSERT INTO `category` VALUES ('14626', '配饰', 'Accessories', 'category/516a65cba3884658b3817a80b6913576.jpg', 'topicNew/14626', '3,6,8,10,12,14');
INSERT INTO `category` VALUES ('14627', '家居生活', 'Home', 'category/287e086122be4949a77cead02272af34.jpg', 'topicNew/14627', '5,8');
INSERT INTO `category` VALUES ('14630', '母婴', 'Mother&Children', 'category/f7c7410ac9c841ee998e7c56376a4c82.jpg', 'topicNew/14630', '3,5,36');
INSERT INTO `category` VALUES ('14764', '设计师品牌', 'Designer Brand', 'category/e05c6cf388a14c5bb09ea8f50b0ad328.jpg', 'topicNew/14764', '4,8,10,12,14,16');
INSERT INTO `category` VALUES ('15231', '奥莱特卖', 'Sale', 'category/8ec59c6eb88e46afbfd6400a27d48d5b.jpg', 'topicNew/15231', '2');
INSERT INTO `category` VALUES ('15482', '家电数码', '3C', 'category/c70690a5755c4e359d7a4318c665e4f3.jpg', 'topicNew/15482', '7,18,20,22,26,27,28,29');
INSERT INTO `category` VALUES ('15524', '服装', 'Clothing', 'category/dca1969bd854488db8c58edd2ee30672.jpg', 'topicNew/15524', '3,21');
INSERT INTO `category` VALUES ('15757', '豪车', 'Luxury car ', 'category/9ab7dd67751f41c98e0e1f98f0ebb493.jpg', 'topicNew/15757', '2,17');
INSERT INTO `category` VALUES ('17507', '名物', 'Secoo Ming', 'category/2b128b676c904159b14cf9825cf44854.jpg', 'topicNew/17507', '6,8,10,12,25');
INSERT INTO `category` VALUES ('19007', '运动户外', 'Sports&Outdoor', 'category/0b06893b40bc4139aff60e75c79ec48c.jpg', 'topicNew/19007', '4,6');
INSERT INTO `category` VALUES ('19822', '美酒美食', 'Food & Wine', 'category/29dbf58f23214bd6bebafa90c04188be.jpg', 'topicNew/19822', '4,6,8,20');
INSERT INTO `category` VALUES ('21817', '鞋靴', 'Shoes', 'category/undefined', 'topicNew/21817', '4');
INSERT INTO `category` VALUES ('23022', '包袋', 'Bags', 'category/96b10e7097b34b9887fb038809b501a3.jpg', 'topicNew/23022', '5');
INSERT INTO `category` VALUES ('23167', '营养保健', 'Nutrition', 'category/6e9ced34abb84ca28c50f969fa1b3b16.jpg', 'topicNew/23167', '4,15,17,19,21');

-- ----------------------------
-- Table structure for floor
-- ----------------------------
DROP TABLE IF EXISTS `floor`;
CREATE TABLE `floor` (
  `floor` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `name` varchar(999) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `id` int(11) DEFAULT NULL,
  `second_price` varchar(255) DEFAULT NULL,
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=274 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of floor
-- ----------------------------
INSERT INTO `floor` VALUES ('47', 'https://pic12.secooimg.com/product/300/300/10/53/d55d39efe6154966bf2c264e72c7b128.jpg', 'Kinsole/清尚 手作复古光学镜架39KF', '968', '22790', '', '261');
INSERT INTO `floor` VALUES ('47', 'https://pic12.secooimg.com/product/300/300/53/98/5b15dc28607c40c2a48c72998f9124c2.jpg', 'Kinsole/清尚20光学镜架防眩光时尚潮流金属47KF', '958', '22790', '', '262');
INSERT INTO `floor` VALUES ('47', 'https://pic12.secooimg.com/product/300/300/50/37/14005037.jpg', 'Ray-Ban/雷朋光学 时尚休闲眼镜架RB3447V', '633', '22790', '', '263');
INSERT INTO `floor` VALUES ('47', 'https://pic12.secooimg.com/product/300/300/50/98/2be8926bad0741e39fa26f40bc723319.JPG', 'Ray-Ban/雷朋眼镜框 RB7073 2012 男女款复古圆框近视镜架', '750', '22790', '', '264');
INSERT INTO `floor` VALUES ('47', 'https://pic12.secooimg.com/product/300/300/99/10/cf35ecf0f20942c5957051be495af865.jpg', 'Kinsole/清尚 手作复古光学镜架42KF', '858', '22790', '', '265');
INSERT INTO `floor` VALUES ('47', 'https://pic12.secooimg.com/product/300/300/57/49/912c56f2514249308d7bd4aebe3a9276.jpg', 'OPTICALW James(Metal)系列光学镜架 OPJAMES-C01', '1808', '22790', '', '266');
INSERT INTO `floor` VALUES ('47', 'https://pic12.secooimg.com/product/300/300/49/99/1cfeebc7847f4c4aa63601c11cba5343.JPG', 'Ray-Ban/雷朋光学镜架 RB7111 5692 男女款复古双梁近视眼镜框', '600', '22790', '', '267');
INSERT INTO `floor` VALUES ('47', 'https://pic12.secooimg.com/product/300/300/06/50/16130650.jpg', 'Armani/阿玛尼  眼镜 0AR 5024J 3003', '1182', '22790', '', '268');
INSERT INTO `floor` VALUES ('47', 'https://pic12.secooimg.com/product/300/300/10/49/f1fc0e12131c4899bef12a28d1659e57.jpg', '【韩国直邮】STEELBYSTEALER ST 602系列银色眼镜框 ST602_Silver (STL03)', '1942', '22790', '', '269');
INSERT INTO `floor` VALUES ('47', 'https://pic12.secooimg.com/product/300/300/56/99/8c7061398df84ba19253628cb176ef02.jpg', '【韩国直邮】STEELBYSTEALER DIN系列黑色眼镜框 DIN_STL01', '1860', '22790', '', '270');
INSERT INTO `floor` VALUES ('47', 'https://pic12.secooimg.com/product/300/300/55/10/7f3c85bc5d2d49eda9631c57d7f87a4d.jpg', 'CALIPHASH 【订制商品】Opinio 系列光学镜架 OPINIO_02(GLASSES)', '2266', '22790', '', '271');
INSERT INTO `floor` VALUES ('47', 'https://pic12.secooimg.com/product/300/300/98/49/b168ede206f64a46baeaf9ff7b62b28a.JPG', 'EJE OPTICO SISTEMA/EJE OPTICO SISTEMA复古圆框近视镜架 J2109 男女钛架EOS眼镜框', '1313', '22790', '', '272');
INSERT INTO `floor` VALUES ('47', 'https://pic12.secooimg.com/product/300/300/10/98/fbe2bc9bf229457696b268a6a1e67c06.jpg', 'PRADA/普拉达2017春夏款摩登潮款光学眼镜', '1306', '22790', '1122', '273');

-- ----------------------------
-- Table structure for swiper
-- ----------------------------
DROP TABLE IF EXISTS `swiper`;
CREATE TABLE `swiper` (
  `id` int(11) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `pageid` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of swiper
-- ----------------------------
INSERT INTO `swiper` VALUES ('0', 'swiper/bb007a1cf4004cabb999a6a4ce81e584.jpg', '', 'app_gucci_index1');
INSERT INTO `swiper` VALUES ('0', 'swiper/52fecc45973b48379a7d8a70792e5663.jpg', '', 'app_gucci_index1');
INSERT INTO `swiper` VALUES ('0', 'swiper/20aec33eff854504b99d55a914f4839f.jpg', '', 'app_gucci_index1');
INSERT INTO `swiper` VALUES ('0', 'swiper/6f1b2158aa594fffbe8188ac1938b8a1.jpg', '', 'app_gucci_index1');

-- ----------------------------
-- Table structure for tab
-- ----------------------------
DROP TABLE IF EXISTS `tab`;
CREATE TABLE `tab` (
  `id` int(11) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `pageid` varchar(255) DEFAULT NULL,
  `floors` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tab
-- ----------------------------
INSERT INTO `tab` VALUES ('17507', 'tab/52127722da354af4aa265398f29399bf.jpg', '名物', 'topicNew/17507', '6,8,10,12,25');
INSERT INTO `tab` VALUES ('21326', 'tab/5d51938578044b41981bc7802ba2b8fc.jpg', '生活方式', 'topicNew/21326', '8,10,12,22,23,24,25,26');
INSERT INTO `tab` VALUES ('22014', 'tab/1cb77f2cfb4d41e2a8615ce5ebfb2879.jpg', '专柜自提', 'topicNew/22014', '4,6,8,10,12,14,16,18,20,22,24,26');
INSERT INTO `tab` VALUES ('22928', 'tab/153fe7b9d2bc4db7bb7d6316f567c396.jpg', '断码专区', 'topicNew/22928', '5,7,9,11,13,15,17,21,23,25,27,29,31,33,38,40,42,46,48,50');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `phonenum` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('Aze', 'c9fec8c614079a6c69c57725bb310963', '1', '2018-02-07 16:44:14', '18819345213');
INSERT INTO `user` VALUES ('ccc', 'c9fec8c614079a6c69c57725bb310963', '2', '2018-02-07 17:25:26', '18819345213');
INSERT INTO `user` VALUES ('cccc', 'c9fec8c614079a6c69c57725bb310963', '3', '2018-02-07 17:27:08', '18819345213');

-- ----------------------------
-- Table structure for week_good
-- ----------------------------
DROP TABLE IF EXISTS `week_good`;
CREATE TABLE `week_good` (
  `id` int(11) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `pageid` varchar(255) DEFAULT NULL,
  `floors` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of week_good
-- ----------------------------
INSERT INTO `week_good` VALUES ('15529', 'week/b179ccc3780649aca90be639bafb4ce7.jpg', 'topicNew/15529', '');
INSERT INTO `week_good` VALUES ('22439', 'week/412c7a6d782a433dbb87c3f54311fa35.jpg', 'topicNew/22439', '54,56');
INSERT INTO `week_good` VALUES ('22441', 'week/271aa54b0b3341a98ab80370820960f0.jpg', 'topicNew/22441', '70,72,74,76,78,80');
INSERT INTO `week_good` VALUES ('22789', 'week/36d3a5d3253f454bac6b262c1f679c9d.jpg', 'topicNew/22789', '51,52,53,54');
INSERT INTO `week_good` VALUES ('22790', 'week/2ae9568e420745a789a5a8ad1a96bcac.jpg', 'topicNew/22790', '19,21,31,33,43,45,47,48,49');
INSERT INTO `week_good` VALUES ('22791', 'week/269e833128e3423699e733d63ae8d934.jpg', 'topicNew/22791', '37');
INSERT INTO `week_good` VALUES ('22793', 'week/62d85e911e904e0ebb258bc54781c0bc.jpg', 'topicNew/22793', '42');
INSERT INTO `week_good` VALUES ('22794', 'week/f76b1bfe0b6947dc9f1bdaea06c3859c.jpg', 'topicNew/22794', '12,20,24,28,31,35,41,45,48');
INSERT INTO `week_good` VALUES ('23069', 'week/edf407b2d4604b9ba3fe28fe32dbf70d.jpg', 'topicNew/23069', '15,17,21,23,29,30,31');
