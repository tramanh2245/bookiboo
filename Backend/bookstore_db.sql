-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 27, 2025 lúc 10:10 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `bookstore_db`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `stock` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `category` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `books`
--

INSERT INTO `books` (`id`, `title`, `author`, `price`, `description`, `image_url`, `stock`, `created_at`, `category`) VALUES
(1, 'Ehon Nhật Bản - Tranh Truyện Nối', 'Kim Đồng', 23000.00, 'Ehon - một dạng truyện tranh Nhật Bản có lịch sử hàng trăm năm-là phương thức truyền thống nhưng hiệu quả mà người Nhật lựa chọn để bước vào thế giới của con, làm bạn với con, hiểu con, từ đó có cách giáo dục và nuôi dạy con hiệu quả.', 'Uploads/682ab161c1b49_noi.jpg', 0, '2025-05-14 14:36:52', 'phat-trien-quan-sat'),
(22, 'Bạn Pokopoko - Đi giao sữa', 'Sakai Sachie', 23000.00, 'Bạn Pokopoko đi giao sữa là một câu chuyện vô cùng đáng yêu về một ngày làm việc của bạn Pokopoko. Từ sáng sớm đến tối khuya, Pokopoko chăm chỉ mang sữa đến cho những vị khách đặc biệt để giúp các bạn tạo ra những món ăn thật ngon lành.\r\n\r\nSau một ngày làm việc vất vả, Pokopoko nhận được phần thưởng xứng đáng – một chai sữa thật to. Đây chính là bài học ý nghĩa cho trẻ về việc lao động chăm chỉ sẽ mang lại những thành quả đáng giá và tinh thần lạc quan, trách nhiệm của Pokopoko.\r\n\r\nKhông chỉ thế, trẻ còn khám phá thêm được thật nhiều món ăn hấp dẫn từ sữa, khiến mỗi trang sách trở nên thú vị và bổ ích.\r\n\r\nHãy là một em bé chăm chỉ và lạc quan giống như bạn Pokopoko nhé\r\n\r\n???? Tóm tắt:\r\n\r\nHôm nay, hãy cùng Pokopoko đi giao sữa nhé. Vào chuyến giao hàng vào buổi sáng, Pokopoko giao tới cho bạn Sóc, sữa được đem tới cho các em bé Sóc rất đáng yêu. Vào buổi trưa, nơi nhận lại là nhà của bạn Thỏ, ở đây các bạn Thỏ sẽ làm món gì thật ngon từ sữa đây nhỉ? Hãy cùng Mogu theo dõi nhé.', 'Uploads/682aa06ab87c3_s1.jpg', 0, '2025-05-19 03:07:22', 'phat-trien-tu-duy'),
(23, 'Sách cho bé từ 3 tuổi - Phát triển tư duy Hạt da trời (Truyện tranh Ehon Nhật Bản)', 'Fukuinkan', 32000.00, '???? Thông tin chung\r\nVới tình huống truyện bất ngờ và thông điệp ý nghĩa, “Hạt da trời” là cuốn Ehon đem đến nhiều trải nghiệm đọc sách vô cùng thú vị. Câu chuyện xoay quanh hạt mầm nhỏ màu xanh không chỉ giúp trẻ rèn tính kiên nhẫn, mà còn khuyến khích trẻ học cách sẻ chia trong cuộc sống.\r\n\r\nNgoài ra, với hình minh hoạt tối giản đặc trưng nhưng không kém phần tươi sáng và đẹp mắt, cuốn sách còn đem lại sự tập trung và vui vẻ trong quá trình đọc.\r\n\r\nVề tác giả: Nakagawa Rieko là tác giả rất nổi tiếng tại Nhật Bản với series tranh truyện kinh điển “Gư-ri và Gư-ra”. Đến nay, “Hạt da trời” đã được tái bản đến 115 lần tại nhiều quốc kể từ lần đầu xuất bản vào năm 1964.\r\n\r\n???? Tóm tắt\r\nYuji đổi cho Cáo chiếc máy bay để đổi lấy bảo bối hạt da trời. Nhờ sự chăm sóc tỉ mỉ của Yuji mà hạt da trời nảy mầm thành một ngôi nhà và trở thành nhà chung cho mọi người. Khi mọi người đang vui vẻ trong ngôi nhà màu da trời thì Cáo xuất hiện. Cáo đuổi hết mọi người ra ngoài, đòi lại ngôi nhà và…\r\n\r\n????Đối tượng độc giả\r\nĐọc cho bé: từ 4 tuổi trở lên \r\n\r\nBé tự đọc: từ 6 tuổi trở lên', 'Uploads/682aa3bce3354_hat-da-troi.jpg', 0, '2025-05-19 03:21:32', 'phat-trien-tu-duy'),
(24, 'Bé Yuki Là Bà Của Tớ', 'ssds', 20990.00, 'Bà của Kenta đã lớn tuổi, bà hay bị đãng trí. Mỗi lần như vậy bà thường biến thành bé Yuki 7 tuổi, 5 tuổi và có khi là 3 tuổi. Nhưng không sao cả vì lúc nào Kenta cũng luôn ở bên làm bạn với bà. Kenta cùng bà ăn bánh pudding, xem album ảnh, chơi Yoyo,... vui ơi là vui.\r\n\r\n……\r\n\r\n\"Bé Yuki là bà của tớ\" là câu chuyện cảm động về tình cảm gia đình xoay quanh câu chuyện của 2 bà cháu bé Kanta. Khi bà lớn tuổi và dần mất đi trí nhớ, bà luôn nhẹ nhàng ân cần kể cả khi bà nghĩ rằng mình chỉ là bé Yuki 7 tuổi, 5 tuổi hay thậm chí 3 tuổi. Câu chuyện đầy tính nhân văn giúp trẻ biết trân trọng và thể hiện tình yêu thương với những người thân trong gia đình, đặc biệt là ông bà.\r\n\r\nNhìn vào hành động chu đáo của bạn Kenta khi chăm sóc bà, con sẽ học được cách quan tâm và chăm sóc mọi người. Từ đó dần trở thành một em bé tình cảm và hiểu chuyện.\r\n\r\nVới nét vẽ đáng yêu kết hợp với tình huống truyện nhẹ nhàng mà gần gũi, cuốn sách còn giúp trẻ gợi nhớ về những kỷ niệm đẹp bên ông bà.', 'Uploads/682aa4236e8da_be-yuki-la-ba-cua-to.jpg', 0, '2025-05-19 03:23:15', 'phat-trien-tu-duy'),
(25, 'Leo Núi', 'Wakiko Sato', 12000.00, '“Leo núi” nằm trong series “Bà Baba” vô cùng nổi tiếng của tác giả Wakiko Sato. Với cách xây dựng tình huống ngộ nghĩnh và câu chuyện được kể dưới góc nhìn trẻ thơ. Cuốn sách như một người bạn cho con sự đồng cảm, thôi thúc con tự tin, sáng tạo theo cách của riêng mình. \r\n\r\nKết hợp những gam màu tươi sáng để kể câu chuyện vui vẻ, hồn nhiên. Đọc cùng con cuốn “Leo núi” không chỉ mang lại không khí vui vẻ mà còn tạo ra những tiếng cười và giúp con yêu thích việc đọc sách hơn. \r\n\r\nNgoài ra, cuốn Ehon còn rất thuận tiện cho ba mẹ muốn giúp con làm quen với việc đọc sách hàng ngày vì cực dễ đọc và dễ theo dõi.\r\n\r\nTóm tắt\r\nHôm nay thời tiết thật đẹp nên bà Baba đã rủ các bạn động vật cùng đi leo núi. Thế nhưng đi leo núi có một ngày thôi mà bạn nào cũng mang bao nhiêu là đồ đạc. Nào là kẹo ngậm, đồ chơi, truyện tranh,... có bạn còn mang cả nồi, đĩa và xô nữa. Cả một núi đồ chất đầy trong sân thì mang đi leo núi kiểu gì nhỉ? “Thôi được. Để bà nghĩ xem có cách nào không.” \r\n\r\nĐối tượng độc giả: Đọc cho bé từ 3 tuổi trở lên', 'Uploads/682aa5447df57_co-ca-setouchi-taiko-muon-leo-nui-phu-si.jpg', 0, '2025-05-19 03:28:04', 'phat-trien-tu-duy'),
(26, 'Mở Chợ Trong Rừng', 'Gomi Taro', 32000.00, '“Mở chợ trong rừng” là cuốn sách đầu đời về kinh tế cho bé. Với lối diễn đạt thú vị và dễ hiểu, con sẽ được làm quen với khái niệm cơ bản nhất của kinh tế học, cách hình thành thị trường qua câu chuyện sinh động từ các bạn động vật trong rừng.\r\n\r\nNgoài ra, cuốn sách còn giúp con hiểu về sự sẻ chia, giúp đỡ sẽ mang lại niềm vui và hạnh phúc cho mọi người. Còn sự chăm chỉ và cố gắng sẽ tạo nên thành quả lao động vượt trội.\r\n\r\nĐể giúp con hiểu hơn về khái niệm trao đổi hàng hóa, ba mẹ có thể cùng bé chơi trò “giả vờ mua sắm” - một trong những trò chơi đồ hàng được các bạn nhỏ cực kỳ yêu thích.\r\n\r\n“Mở chợ trong rừng” được sáng tác bởi tác giả Gomi Taro rất nổi tiếng tại Nhật Bản - tác giả tiên phong trong lĩnh vực sáng tác tranh truyện thiếu nhi. Chỉ trong hơn 20 năm ông đã cho ra đời hơn 230 cuốn sách. Ông sở hữu nhiều giải thưởng nổi tiếng, trong đó có giải thưởng tại Hội chợ sách thiếu nhi quốc tế Bologna - Ý.\r\n\r\nTóm tắt:\r\nCáo có một cây nho sai quả. Cáo tặng Gấu Mèo 1 chùm nho và được tặng lại 1 quả táo. Sau đó, Cáo lại đem nho tặng cho nhiều bạn hơn để nhận được những món đồ khác. Rồi Cáo lập ra hẳn một gian hàng riêng để cho nhiều nho hơn. Mọi người cũng lần lượt lập gian hàng và trao đổi hàng hóa cho nhau. Thế là có một cái chợ mọc lên trong rừng.\r\n\r\nĐối tượng độc giả:\r\nĐọc cho bé từ 3 tuổi', 'Uploads/682aa5e593fec_mo-cho-trong-rung.jpg', 0, '2025-05-19 03:30:45', 'phat-trien-tu-duy'),
(27, 'Vất Vả Ngủ Trưa', 'Wakiko Sato', 5000.00, '“Vất vả ngủ trưa” là cuốn Ehon chủ đề thú vị, giúp khơi gợi sự đồng cảm và khích lệ sự tự tin của các bạn nhỏ. \r\n\r\nVới tình huống hài hước cùng cách xây dựng nhân vật có tính cách và hành động hết sức trẻ con. Cuốn sách đem lại cảm giác quen thuộc và dễ dàng nhận được sự yêu mến của các bạn nhỏ.\r\n\r\nNgoài ra, cuốn Ehon còn giúp con giữ tinh thần lạc quan trong mọi hoàn cảnh, học cách hợp tác cùng nhau để khắc phục khó khăn. \r\n\r\nTóm tắt\r\nTrời đã sang tháng 4 nhưng mùa đông vẫn chưa chịu kết thúc. Bà Baba thèm một giấc ngủ trưa dưới bầu trời ấm áp. Thế là bà và các bạn động vật đã tìm cách cực độc đáo để đuổi mùa đông đi. Cùng xem tuyệt chiêu của bà Baba nhé.\r\n\r\nĐối tượng độc giả\r\nĐọc cho bé: từ 3 tuổi trở lên\r\n\r\nBé tự đọc: từ 6 tuổi trở lên', 'Uploads/682aa64aebad5_vat-va-ngu-trua.jpg', 0, '2025-05-19 03:32:26', 'phat-trien-tu-duy'),
(28, 'Uống Sữa Với Lòng Biết', 'Nhiều tác giả', 6000.00, 'Tóm tắt:\r\nHôm nay bố đưa bé đến trang trại bò sữa để trải nghiệm vắt sữa bò. Công việc lấy sữa tưởng đơn giản nhưng lại cần sự cẩn thận và khéo léo vô cùng. Sau một hồi được bác ở trang trại giới thiệu và hướng dẫn tỉ mỉ bạn nhỏ đã vắt được hẳn 1 xô sữa đầy. Cùng cảm ơn cô bò và mọi người ở trang trại và cùng thưởng thức cốc sữa nóng thơm ngon thôi nào!\r\n\r\n \r\n\r\nĐối tượng độc giả:\r\nĐọc cho bé: từ 3 tuổi trở lên\r\n\r\nBé tự đọc: từ 6 tuổi trở lên', 'Uploads/682aa6aaecc12_ehon-uong-sua-voi-long-biet-on.jpg', 0, '2025-05-19 03:34:02', 'phat-trien-tu-duy'),
(29, 'Bồn Tắm Của Rừng', 'Toshio Nishimura', 30010.00, 'Thông tin chung\r\nCảm giác được tắm trong bồn tắm sẽ tuyệt thế nào nhỉ? Là cảm giác được ngâm mình trong nước nóng thư giãn thật tuyệt. Cuốn ehon với cốt truyện thú vị, hài hước khiến cho việc đi tắm hàng ngày trở nên thật sinh động. Nào em bé ơi, đọc cuốn truyện này xong chúng mình cùng Chà chà chà… và ngâm mình trong bồn tắm nhé.\r\n\r\nTóm tắt\r\nBạn sư tử tới tắm trong rừng và bắt đầu tắm rửa. Bỗng nhiên, bạn voi tới, thấy vậy sư tử nhờ voi chà lưng cho mình. Sau đó, các loài động vật lần lượt đến, nào là cá sấu, lợn, thỏ,... Cùng xem các bạn ấy sẽ tắm ở bồn tắm trong rừng thế nào nhé.\r\n\r\n Đối tượng độc giả\r\nĐọc cho bé: từ 2 tuổi trở lên', 'Uploads/682aa765ccaaa_bon-tam-cua-rung(1).jpg', 0, '2025-05-19 03:36:44', 'phat-trien-tu-duy'),
(30, 'Bác Sĩ An-tôn Cùng Giúp Nhau Khi Khó Khăn Nhé', 'kja', 41000.00, 'Thông tin chung\r\nTiếp nối Series truyện về Bác sĩ hiền hậu An-tôn, lần này các bạn nhỏ sẽ được trải nghiệm một câu chuyện cực kì ấm áp về bệnh viện của bác sĩ An-tôn. Ba mẹ có thể hoàn toàn yên tâm khi đọc cho trẻ cuốn truyện này, bởi nó sẽ giúp con hiểu được về lòng tốt và sự sẻ chia một cách gần gũi dễ hiểu nhất.\r\n\r\nCâu chuyện về sự giúp đỡ, hình ảnh bác sĩ An-tôn hiền hậu và các bạn động vật trong rừng hiện lên thật sống động chắc chắn sẽ giúp nuôi dưỡng tâm hồn trẻ trong những năm tháng đầu đời.\r\n\r\nTóm tắt\r\nCác bạn động vật luôn tới bệnh viện của Bác sĩ An-tôn để khám bệnh. Nhưng hôm nay, có vẻ như một cơn bão nào đó đang đến. Bầu trời tối sầm, gió nổi lên và trời bắt đầu mưa. Liệu các bạn động vật có sao không nhỉ?\r\n\r\nĐối tượng độc giả\r\nĐọc cho bé: từ 3 tuổi trở lên\r\n\r\nBé tự đọc: từ 6 tuổi trở lên', 'Uploads/682aa7b6413e8_ehon-bac-si-an-ton-cung-giup-nhau-khi-kho-khan-nhe_zc81-bq.jpg', 0, '2025-05-19 03:38:30', 'phat-trien-tu-duy'),
(31, 'Thiên Đường', 'jawu', 12000.00, 'Thông tin chung:\r\n\r\n\r\nVới mỗi đứa trẻ, chỉ cần có mẹ, thì đó là thiên đường. Cuốn Ehon “Thiên đường” là bài thơ của tác giả Nankichi Niimi về tâm hồn của những đứa bé khi được mẹ địu trên lưng. Lời thơ nhẹ nhàng kết hợp với minh họa đầy yêu thương, chắc hẳn sẽ giúp các em bé cảm nhận được tình yêu thương vô bờ bến của mẹ. Cuốn sách giúp con không chỉ cảm thấy được tình yêu thương mà còn giúp con tập nói qua những lời thơ hết sức giản dị.\r\n\r\nBài thơ được viết khoảng năm 1931 (năm thứ 6 Chiêu Hòa) tuy nhiên được viết trong cuốn sổ tay nên không được công bố. Sau đó, họa sĩ Hideko Nagano đã phác họa lại và cho ra đời cuốn Ehon “Thiên đường”.\r\n\r\nTóm tắt:\r\nTấm lưng êm ái của người mẹ là cái nôi nâng giấc ngủ ngon cho các em bé, là nơi yên bình đầy sự bao bọc và chở che. Trên lưng mẹ, em bé sẽ cảm nhận được hơi ấm truyền sang, được theo mẹ đi khắp mọi nơi, cùng mẹ làm tất cả các công việc. Từ trên lưng mẹ, em bé sẽ quan sát, học hỏi được mọi điều từ người lớn và dần dần trưởng thành.\r\n\r\nNgười mẹ nào cũng có\r\n\r\nMột thiên đường của mình\r\n\r\nMẹ nào mà chẳng có\r\n\r\nMẹ nào mà chẳng mang \r\n\r\nMột tấm lưng êm ái…', 'Uploads/682aa841d88c6_thien-duong(1).jpg', 0, '2025-05-19 03:40:49', 'phat-trien-tu-duy'),
(32, 'Thức Dậy Đi', 'Gomi Taro', 34000.00, 'Thức Dậy Đi\r\n \r\n \r\n \r\n \r\nNhóm: Làm quen với sách\r\nCuốn sách đầy sự vui nhộn, hài hước nhưng không kém phần hồi hộp dành cho các bạn nhỏ từ 0 tuổi chắc chắn sẽ khiến giờ đọc sách hàng ngày trở nên vô cùng thú vị.\r\n\r\nVới nét vẽ ngộ nghĩnh, nội dung đơn giản, cuốn sách giúp con học về màu sắc, hình khối và những sự vật chỉ xuất hiện vào ban đêm như: mặt trăng, ngôi sao, các bạn dơi,... \r\n\r\n \r\n\r\nĐặc biệt, cuốn sách được thiết kế khổ dọc và có sự nối tiếp giữa các trang sẽ giúp việc đọc sách được liền mạch, điều cực kỳ cần thiết đối với các bạn nhỏ có độ tập trung chưa cao. Trong quá trình đọc ba mẹ nên thay đổi tông giọng theo các tình huống, các nhân vật để tạo cảm giác như con được trải nghiệm câu chuyện trong sách.\r\n\r\n“Thức dậy đi” là một trong những tác phẩm độc đáo của Gomi Taro - tác giả sáng tác truyện thiếu nhi sáng tạo nổi tiếng tại Nhật Bản. \r\n\r\n \r\n\r\n???? Tóm tắt\r\nMàn đêm buông xuống. Khi mọi vật đều chìm vào giấc ngủ thì bỗng nhiên rơi… rơi… rơi… Một bạn chim nhỏ đang ngủ say bị rơi xuống khỏi mặt trăng. \r\n\r\nNày, dậy đi ~\r\n\r\nNếu tiếp tục thế này thì nguy hiểm đấy!... Mọi người liên tục nhắc nhở bạn chim thức dậy đi.\r\n\r\n \r\n\r\n???? Đối tượng độc giả\r\nĐọc cho bé: từ 0 tuổi trở lên\r\n\r\nBé tự đọc: từ 6 tuổi trở lên', 'Uploads/682aa9c5932b2_tranh-truyen-ehon-nhat-ban-thuc-day-di.jpg', 0, '2025-05-19 03:47:17', 'lam-quen-voi-sach'),
(33, 'Chúc Ngủ Ngon', 'hjhj', 23000.00, '“Chúc ngủ ngon” là cuốn sách nhỏ gọn, nội dung gần gũi giúp con nhận biết màu sắc, đồ vật, những hoạt động trước khi đi ngủ một cách cực kì tự nhiên. \r\n\r\nVới màu sắc tương phản, nổi bật, hình minh họa dễ thương và câu từ ngắn gọn giúp bé phát triển ngôn ngữ và thị giác, cuốn sách là lựa chọn tuyệt vời để bé con bắt đầu LÀM QUEN với việc đọc sách.\r\n\r\n“Chúc ngủ ngon”  nằm trong bộ sách 3 cuốn Nhận biết Màu sắc, đồ vật, kĩ năng hàng ngày; được nghiên cứu sáng tác bởi Osaka YWCA Children\'s Library (Thư viện văn hóa giáo dục dành cho trẻ em tại Nhật Bản).\r\n\r\n???? Tóm tắt\r\n\r\nTrước khi đi ngủ thì chúng mình cần phải tắm rửa và thay quần áo sạch sẽ nha! Đi tắm với mình có bạn vịt “quạc quạc”, bạn tàu “tu tu xình xịch”... Tắm xong rồi thì mình lau khô người, mặc một bộ đồ ngủ thật xinh và “khò khò” cùng bạn gấu nhé! \r\n\r\n???? Đối tượng độc giả: Đọc cho bé từ 0 tuổi', 'Uploads/682aaa0d5d19e_ehon-chuc-ngu-ngon.jpg', 0, '2025-05-19 03:48:29', 'lam-quen-voi-sach'),
(34, 'Đi Dạo Trong Gió Xuân', 'Michiko Egashira', 6990.00, 'Thông tin chung\r\nMùa xuân dưới nét vẽ của tác giả hiện lên thật dịu dàng và xinh đẹp. “Đi dạo trong gió xuân” giúp con làm quen với những sự vật, hiện tượng đặc trưng của mùa xuân. \r\n\r\nNhững từ tượng thanh xì xào, xào xạc thu hút sự tập trung của con trong quá trình nghe đọc sách, giúp con tưởng tượng ra khung cảnh mùa xuân với những làn gió nhẹ nhàng, dễ chịu.\r\n\r\nTác giả\r\nMichiko Egashira sinh năm 1978, là một tác giả truyện tranh thiếu nhi nổi tiếng tại Nhật Bản. Đặc trưng phong cách vẽ của bà là sử dụng màu nước kết hợp một cách hài hòa mà không kém phần nổi bật. Ngoài nổi tiếng với rất nhiều các tranh truyện Ehon thiếu nhi, bà còn được biết tới với việc vẽ minh họa cho tạp chí và sách giáo khoa Nhật Bản. \r\n\r\nTóm tắt\r\nMặc bộ váy yêu thích, xỏ đôi giày mới cùng đi dạo dưới trời xuân nào. Thời tiết đẹp quá. Tận hưởng hơi thở nhẹ nhàng của mùa xuân thôi. Lon ton…lon ton…lon ton. A, hoa anh đào nở đẹp quá. A, nhiều hoa cỏ mềm mại chưa này. Ồ, bong bóng này. Thời tiết dễ chịu thật, còn nghe được cả tiếng gió nữa này.\r\n\r\nĐối tượng độc giả\r\nĐọc cho bé: từ 1 tuổi trở lên\r\n\r\nBé tự đọc: từ 3 tuổi trở lên', 'Uploads/682aaa6bdd574_ehon-di-dao-trong-gio-xuan.jpg', 0, '2025-05-19 03:50:03', 'lam-quen-voi-sach'),
(35, 'Chào Buổi Sáng', 'Taro Miura', 11990.00, 'Cuốn Ehon sinh động giúp ba mẹ nuôi dạy tính kỷ luật và tự giác cho con ngay từ khi còn bé. Cuốn sách giúp trẻ làm quen việc tự giác thức dậy đúng giờ vào mỗi buổi sáng bằng việc sử dụng hình ảnh các bạn rau củ như: em bé Khoai tây, mẹ Cà rốt, bố Củ cải,... \r\n\r\nNgoài ra, các nhân vật xuất hiện đều kèm theo danh từ xưng hô như bố, mẹ, ông,... cũng giúp các bạn nhỏ học làm quen và nhận diện các thành viên trong gia đình. \r\n\r\nCuốn sách thuộc bộ sách “Phát triển kỹ năng” được tác giả Taro Miura viết sau quá trình tỉ mỉ quan sát và nuôi dưỡng con nhỏ nên cực kỳ phù hợp với tâm lý của trẻ.\r\n\r\n☀️ Tóm tắt\r\nEm bé Khoai tây, mẹ Cà Rốt, bố Củ cải,... và tất cả mọi người đều thức dậy thật nhanh khi nghe tiếng báo thức hàng ngày. Vì được ngủ ngon và nghỉ ngơi đúng giờ nên ai cũng vui vẻ và tràn đầy năng lượng. Đặc biệt, các bạn nhỏ sau một giấc ngủ ngoan còn lớn nhanh nữa.\r\n\r\n☀️ Đối tượng độc giả\r\nĐọc cho bé: từ 0 tuổi trở lên\r\n\r\nBé tự đọc: từ 6 tuổi trở lên', 'Uploads/682aaadc50eda_chao-buoi-sang(1).jpg', 0, '2025-05-19 03:51:56', 'lam-quen-voi-sach'),
(36, 'Ú Òa! Ra Vườn Thôi!', 'Takako Hirono', 4990.00, 'SÁCH EHON KÍCH THÍCH TƯ DUY VÀ KHẢ NĂNG QUAN SÁT CHO TRẺ\r\n\r\nTrong giai đoạn từ 0 - 6 tuổi, trẻ nhỏ bắt đầu khám phá thế giới xung quanh bằng tất cả các giác quan. Đây là thời kỳ “vàng” để phát triển kỹ năng quan sát, khả năng tư duy và ngôn ngữ. Bộ sách Ehon “Ú Òa” chính là người bạn đồng hành tuyệt vời, mang đến cho trẻ những trải nghiệm vừa học vừa chơi thông qua những câu chuyện tương tác thú vị.\r\n\r\nVì sao nên cho trẻ đọc bộ sách Ehon Ú oà…?\r\n\r\nEhon là dòng sách tranh nổi tiếng từ Nhật Bản, được thiết kế đặc biệt cho trẻ nhỏ với hình ảnh sinh động, nội dung đơn giản nhưng giàu ý nghĩa. Bộ sách “Ú Òa” gồm ba cuốn: Ú Òa, Quả Gì Đây?, Ú Òa, Mèo Đâu Rồi?, và Ú Òa, Ra Vườn Thôi! – là sự kết hợp hoàn hảo giữa yếu tố giải trí và giáo dục, giúp trẻ phát triển toàn diện trong giai đoạn đầu đời. Đặc biệt chất liệu bìa cứng và giấy bồi cứng cao cấp giúp trẻ dễ dàng lật mở và tương tác với sách.\r\n\r\n Cuốn \"Ú òa, quả gì đây?\": mỗi trang đôi có một loại hoa quả nào đó lấp ló sau lớp lá cây của chúng, trẻ sẽ nhìn để đoán và lật trang sau để xem mình có đoán đúng không. Qua trò chơi đoán hình ảnh này, bé sẽ trau dồi được ngôn ngữ khi nói lên được tên loại hoa quả, rèn luyện khả năng quan sát và tư duy.\r\n\r\nCuốn \"Ú òa, mèo đâu rồi?: Mèo mẹ đang đi tìm các bạn mèo con. Bé sẽ giúp đỡ mèo mẹ bằng cách đọc sách, để tìm các em mèo con đang nấp ở dưới hoặc trong đồ vật nào đó, và mở sang trang sau để xem có đúng như vậy không. Và cuối cùng sẽ là hình ảnh mèo mẹ đang âu yếm đám mèo con rất dễ thương. Cuốn sách kích thích trí tò mò muốn khám phá của bé và cũng luyện tập khả năng quan sát và tư duy của bé khi phải chỉ ra xem bạn mèo con đang ở chỗ nào.\r\n\r\nCuốn \"Ú òa, ra vườn thôi!\": Cùng đi theo đôi chân mang ủng của bạn nhỏ trong ảnh đi khám phá khu vườn. Có gì dưới mặt đất mà đôi chân khám phá ra được nhỉ? Mỗi trang đôi sẽ là một khám phá mới cho bé, từ những chú kiến, ốc sên, ếch, vũng nước để bạn nhỏ thỏa thích nhảy nghịch... Cuốn sách khuyến khích các bạn nhỏ khám phá thế giới bên ngoài, để ý tới những điều nhỏ bé nhưng rất thú vị mà bình thường người lớn đôi khi cũng bỏ qua.', 'Uploads/682aab307add6_u-oa-ra-vuon-thoi.jpg', 0, '2025-05-19 03:53:20', 'lam-quen-voi-sach'),
(37, 'Ú Òa! Quả Gì Đây?', 'Takako Hirono', 3000.00, 'Vì sao nên cho trẻ đọc bộ sách Ehon Ú oà…?\r\n\r\nEhon là dòng sách tranh nổi tiếng từ Nhật Bản, được thiết kế đặc biệt cho trẻ nhỏ với hình ảnh sinh động, nội dung đơn giản nhưng giàu ý nghĩa. Bộ sách “Ú Òa” gồm ba cuốn: Ú Òa, Quả Gì Đây?, Ú Òa, Mèo Đâu Rồi?, và Ú Òa, Ra Vườn Thôi! – là sự kết hợp hoàn hảo giữa yếu tố giải trí và giáo dục, giúp trẻ phát triển toàn diện trong giai đoạn đầu đời. Đặc biệt chất liệu bìa cứng và giấy bồi cứng cao cấp giúp trẻ dễ dàng lật mở và tương tác với sách.\r\n\r\n Cuốn \"Ú òa, quả gì đây?\": mỗi trang đôi có một loại hoa quả nào đó lấp ló sau lớp lá cây của chúng, trẻ sẽ nhìn để đoán và lật trang sau để xem mình có đoán đúng không. Qua trò chơi đoán hình ảnh này, bé sẽ trau dồi được ngôn ngữ khi nói lên được tên loại hoa quả, rèn luyện khả năng quan sát và tư duy.\r\n\r\nCuốn \"Ú òa, mèo đâu rồi?: Mèo mẹ đang đi tìm các bạn mèo con. Bé sẽ giúp đỡ mèo mẹ bằng cách đọc sách, để tìm các em mèo con đang nấp ở dưới hoặc trong đồ vật nào đó, và mở sang trang sau để xem có đúng như vậy không. Và cuối cùng sẽ là hình ảnh mèo mẹ đang âu yếm đám mèo con rất dễ thương. Cuốn sách kích thích trí tò mò muốn khám phá của bé và cũng luyện tập khả năng quan sát và tư duy của bé khi phải chỉ ra xem bạn mèo con đang ở chỗ nào.\r\n\r\nCuốn \"Ú òa, ra vườn thôi!\": Cùng đi theo đôi chân mang ủng của bạn nhỏ trong ảnh đi khám phá khu vườn. Có gì dưới mặt đất mà đôi chân khám phá ra được nhỉ? Mỗi trang đôi sẽ là một khám phá mới cho bé, từ những chú kiến, ốc sên, ếch, vũng nước để bạn nhỏ thỏa thích nhảy nghịch... Cuốn sách khuyến khích các bạn nhỏ khám phá thế giới bên ngoài, để ý tới những điều nhỏ bé nhưng rất thú vị mà bình thường người lớn đôi khi cũng bỏ qua.', 'Uploads/682aab74283c1_u-oa-qua-gi-day.jpg', 0, '2025-05-19 03:54:28', 'lam-quen-voi-sach'),
(38, 'Tranh Truyện Ehon Nhật Bản - Nóng Quá Nóng Quá', 'Mako Taruishi', 4990.00, 'Nóng quá, nóng quá. Chim cánh cụt, sư tử biển, hà mã và voi lần lượt gặp nhau rồi cùng nhau đi tìm kiếm một nơi mát mẻ để tránh nóng. Thế nhưng đi mãi đi mãi mà chẳng thấy bóng râm nào. Và rồi rào rạt, rào rạt, ào ào,... Hình như có tiếng sóng biển thì phải. Thế này thì sẽ chẳng còn nóng nữa.\r\n\r\nCuốn sách sử dụng tình huống và câu từ lặp lại đầy thú vị giúp trẻ gia tăng khả năng ghi nhớ và nhận biết các loài động vật. Đặc biệt, sự xuất hiện của các loài động vật với kích thước tăng tiến còn tạo cơ hội cho trẻ rèn luyện khả năng so sánh.\r\n\r\nHình ảnh các nhân vật với nhiều biểu cảm hài hước và cảm xúc thay đổi liên tục qua mỗi lần lật mở không chỉ đem lại tiếng cười sảng khoái mà còn làm cho những giờ đọc sách trở nên ý nghĩa.', 'Uploads/682aabe66d932_tranh-truyen-ehon-nhat-ban-nong-qua.jpg', 0, '2025-05-19 03:56:22', 'lam-quen-voi-sach'),
(39, 'Tranh Truyện Ehon Nhật Bản - Con Đường', 'Gomi Taro', 6000.00, 'Trang chủ/Catalog/Sách Tiếng Việt/Thiếu Nhi/Sách Tranh - Ehon/Ehon/Tranh Truyện Ehon Nhật Bản - Con Đường10của215\r\nTranh Truyện Ehon Nhật Bản - Con Đường\r\nBarcode:\r\n978604774067\r\nShare\r\nViết đánh giá của bạn\r\n55,000 đ\r\nCòn hàng\r\n1\r\nThêm vào danh sách yêu thích\r\nVendor\r\nNhà bán hàng: Phương Nam Online\r\nTừ nhà sách đầu tiên năm 1982, Nhà Sách Phương Nam đã trở thành hệ thống nhà sách uy t...\r\nĐặt câu hỏi về sản phẩm\r\nĐơn Vị Liên Kết Xuất Bản\r\nMọt Sách Mogu\r\nMô tả sản phẩm\r\nThông tin chi tiết\r\nĐánh giá của khách hàng\r\nĐường rộng, đường hẹp, đường chia đôi; đường cho tàu thuyền, xe cộ, máy bay; đường dẫn khí đốt, nước mưa... Bạn có nhận ra không? Khắp mọi nơi trong cuộc sống, dù hữu hình hay vô hình, những con đường này luôn kết nối chúng ta với thế giới. Dưới sự hướng dẫn tinh tế của Gomi Taro, trẻ sẽ học cách quan sát và tìm cảm hứng từ những điều tưởng chừng bình thường.\r\n\r\nCuốn sách không chỉ giúp trẻ mở rộng tầm nhìn mà còn khám phá cách các \"con đường\" kết nối mọi thứ, kích thích trí tưởng tượng và tư duy sáng tạo.\r\n\r\nThông tin tác giả\r\n\r\nGomi Taro là một trong những tác giả và họa sĩ minh họa nổi tiếng nhất của Nhật Bản trong lĩnh vực sách thiếu nhi. Ông được biết đến với phong cách đơn giản nhưng giàu tính sáng tạo, thường lấy cảm hứng từ những vật thể, hiện tượng quen thuộc trong cuộc sống để khơi gợi trí tưởng tượng cho trẻ nhỏ.\r\n\r\n Gomi Taro đã sáng tác hàng trăm cuốn sách dành cho trẻ em, được yêu thích trên toàn thế giới nhờ cách tiếp cận độc đáo, vừa hài hước, vừa giáo dục, giúp trẻ khám phá thế giới xung quanh một cách thú vị và gần gũi. Các tác phẩm của ông luôn nhấn mạnh sự quan sát và kết nối, khuyến khích trẻ em nhìn thế giới qua lăng kính mới mẻ và đầy màu sắc.', 'Uploads/682aac348bc6d_ehon-con-duong.jpg', 0, '2025-05-19 03:57:40', 'lam-quen-voi-sach'),
(40, 'Wolfoo Ehon - Mắt Tinh Anh, Nhìn Thật Nhanh', '1980 Edu', 7990.00, 'Wolfoo – một nhân vật quá quen thuộc với những bạn nhỏ Việt Nam qua các thước phim hoạt hình hấp dẫn hiện đã có phiên bản sách Ehon.\r\n\r\nMắt tinh anh, nhìn thật nhanh: Trẻ sẽ học được những thói quen tốt liên quan đến mắt trong quá trình học hành và đọc sách. Ngoài ra, Wolfoo cùng các bạn sẽ cho thấy sự dũng cảm đối mặt và khả năng giải quyết vấn đề của trẻ khi đứng trước một câu hỏi hoặc tình huống khó.\r\n\r\nNgoài ra, các bạn nhỏ hãy tìm đọc thêm những cuốn sách trong bộ sách Wolfoo Ehon khác:\r\n\r\n● Ai đánh cắp lâu đài cát của tớ sẽ giúp khơi dậy sự tò mò ở trẻ và giúp trẻ trải nghiệm niềm vui của hành trình khám phá.\r\n\r\n● Người bạn thân nhất của tớ: Trẻ sẽ thấy vô cùng quen thuộc với câu chuyện bị bạn thân bỏ rơi, không chơi cùng, giúp các con làm quen với cảm giác cô đơn, buồn bã, từ đó biết cách sống chan hòa và trân quý tình bạn.\r\n\r\n● Tháp cốc sau cơn lốc: Các con sẽ nhận thức được rằng, trung thực là một đức tính quý báu vô cùng. Và dẫu kết quả có ra sao, thì niềm vui luôn nằm ở sự kiên trì và nỗ lực đạt tới chiến thắng.\r\n\r\n● Ngoài sân chơi vui mê tơi: Trẻ sẽ được cùng Wolfoo, Pando và Kat cùng nhau khám phá hình khối, tư duy sáng tạo và biết cách cùng nhau hợp lực để giải quyết một tình huống khó khăn.\r\n\r\n● Ú òa con đây cơ mà: Trẻ sẽ học được cách cần cẩn thận hơn khi đi chơi ngoài trời, nhanh trí xử lý tình huống nếu bị lạc.\r\n\r\nHãy cùng Wolfoo học hỏi và trau dồi các kỹ năng sống để thông qua những bài học đơn giản, thiết thực và gần gũi với các bạn nhỏ bằng cách đi tìm câu trả lời cho những câu hỏi sau qua mỗi trang sách.\r\n\r\n- Nếu bị lạc thì trẻ cần làm gì?\r\n\r\n- Nếu tranh cãi với bạn bè thì trẻ có buồn không?\r\n\r\n- Các con có nên cùng nhau hợp sức để giải một câu đố?\r\n\r\n- Trung thực có khó không?\r\n\r\n- Trẻ cần làm gì để bảo vệ đôi mắt – cửa sổ tâm hồn của chúng mình?\r\n\r\nWolfoo Ehon sở hữu nội dung và những bài học vô cùng hấp dẫn, được biến tấu dưới dạng các chuyến phiêu lưu của Wolfoo và những người bạn. Trong quá trình đọc, với mỗi hành động và tình huống, trẻ sẽ có cơ hội khám phá, tò mò, biết cách sống trung thực, chan hòa với những người xung quanh, từ đó bồi đắp thêm những cá tính tích cực cho trẻ.', 'Uploads/682aac79b21ed_wolfoo-ehon-mat-tinh-anh-nhin-that-nhanh.jpg', 0, '2025-05-19 03:58:49', 'lam-quen-voi-sach'),
(41, 'Wolfoo Ehon - Ai Đánh Cắp Lâu Đài Cát Của Tớ', '1980 Edu', 2990.00, 'Wolfoo – một nhân vật quá quen thuộc với những bạn nhỏ Việt Nam qua các thước phim hoạt hình hấp dẫn hiện đã có phiên bản sách Ehon.\r\n\r\nMắt tinh anh, nhìn thật nhanh: Trẻ sẽ học được những thói quen tốt liên quan đến mắt trong quá trình học hành và đọc sách. Ngoài ra, Wolfoo cùng các bạn sẽ cho thấy sự dũng cảm đối mặt và khả năng giải quyết vấn đề của trẻ khi đứng trước một câu hỏi hoặc tình huống khó.\r\n\r\nNgoài ra, các bạn nhỏ hãy tìm đọc thêm những cuốn sách trong bộ sách Wolfoo Ehon khác:\r\n\r\n● Ai đánh cắp lâu đài cát của tớ sẽ giúp khơi dậy sự tò mò ở trẻ và giúp trẻ trải nghiệm niềm vui của hành trình khám phá.\r\n\r\n● Người bạn thân nhất của tớ: Trẻ sẽ thấy vô cùng quen thuộc với câu chuyện bị bạn thân bỏ rơi, không chơi cùng, giúp các con làm quen với cảm giác cô đơn, buồn bã, từ đó biết cách sống chan hòa và trân quý tình bạn.\r\n\r\n● Tháp cốc sau cơn lốc: Các con sẽ nhận thức được rằng, trung thực là một đức tính quý báu vô cùng. Và dẫu kết quả có ra sao, thì niềm vui luôn nằm ở sự kiên trì và nỗ lực đạt tới chiến thắng.\r\n\r\n● Ngoài sân chơi vui mê tơi: Trẻ sẽ được cùng Wolfoo, Pando và Kat cùng nhau khám phá hình khối, tư duy sáng tạo và biết cách cùng nhau hợp lực để giải quyết một tình huống khó khăn.\r\n\r\n● Ú òa con đây cơ mà: Trẻ sẽ học được cách cần cẩn thận hơn khi đi chơi ngoài trời, nhanh trí xử lý tình huống nếu bị lạc.\r\n\r\nHãy cùng Wolfoo học hỏi và trau dồi các kỹ năng sống để thông qua những bài học đơn giản, thiết thực và gần gũi với các bạn nhỏ bằng cách đi tìm câu trả lời cho những câu hỏi sau qua mỗi trang sách.\r\n\r\n- Nếu bị lạc thì trẻ cần làm gì?\r\n\r\n- Nếu tranh cãi với bạn bè thì trẻ có buồn không?\r\n\r\n- Các con có nên cùng nhau hợp sức để giải một câu đố?\r\n\r\n- Trung thực có khó không?\r\n\r\n- Trẻ cần làm gì để bảo vệ đôi mắt – cửa sổ tâm hồn của chúng mình?\r\n\r\nWolfoo Ehon sở hữu nội dung và những bài học vô cùng hấp dẫn, được biến tấu dưới dạng các chuyến phiêu lưu của Wolfoo và những người bạn. Trong quá trình đọc, với mỗi hành động và tình huống, trẻ sẽ có cơ hội khám phá, tò mò, biết cách sống trung thực, chan hòa với những người xung quanh, từ đó bồi đắp thêm những cá tính tích cực cho trẻ.', 'Uploads/682aad2401739_wolfoo-ehon-ai-danh-cap-lau-dai-cat-cua-to.jpg', 0, '2025-05-19 04:01:40', 'phat-trien-quan-sat'),
(42, 'Sách Ehon - Chiếc Miệng Xinh, Nói Lời Đẹp - Khi Ra Ngoài', 'Kayo Takatera', 9000.00, 'Bố mẹ biết không, 0 - 6 tuổi là khoảng thời gian mà trẻ có khả năng ghi nhớ, nhận thức tốt nhất các yếu tố từ môi trường xung quanh, đặc biệt là các yếu tố tác động trực tiếp lên các giác quan của trẻ như âm thanh, màu sắc, hình khối,…\r\n\r\nHãy để bộ sách Ehon siêu thú vị mang tên “Chiếc miệng xinh, nói lời đẹp” giúp con phát triển đa giác quan và học hỏi vô vàn điều bổ ích nhé.\r\n\r\nBộ sách này bao gồm 3 chủ đề gần gũi:\r\n\r\nKhi ra ngoài\r\nKhi ở nhà\r\nKhi muốn kết bạn\r\nBộ sách giúp con khám phá thêm rất nhiều điều mới mẻ về thế giới xung quanh, xây dựng các mối quan hệ và còn học hỏi được nhiều điều bổ ích đấy!\r\n\r\nHình thức hỏi đáp của sách cũng làm tăng tính tương tác giữa bố mẹ và các bé, giúp trẻ tiếp thu tốt và ghi nhớ lâu.\r\n\r\nSách có kích thước nhỏ gọn và được làm bằng chất liệu giấy bồi cao cấp nên rất dễ dàng cho trẻ cầm sách lật mở và có độ an toàn cao.', 'Uploads/682aad798dd1a_chiec-mieng-xinh-noi-loi-dep-khi-ra-ngoai.jpg', 0, '2025-05-19 04:03:05', 'phat-trien-quan-sat'),
(43, 'Sức Mạnh Của Những Người Bạn Trái Cây - Giải Cứu Dây Tây Khỏi Quái Vật Nấm Mốc', 'hjho', 9000.00, 'Sách Ehon là một phương pháp giúp ươm mầm toàn diện cả về EQ - IQ cũng như ngôn từ cho trẻ trong những năm tháng phát triển đầu đời.\r\n\r\n3 - 6 tuổi là thời điểm con tò mò học hỏi và khám phá thế giới xung quanh, nên rất cần những bộ sách Ehon giúp trẻ mở rộng hiểu biết, phát triển ngôn ngữ, cảm xúc và các kỹ năng đầu đời cần thiết…\r\n\r\nGợi ý ba mẹ một bộ sách Ehon vô cùng chất lượng để đọc cùng bé: “Sức mạnh của những người bạn trái cây”.\r\n\r\nĐây là bộ Ehon rất đáng yêu với chủ đề về các loại rau củ, trái cây gần gũi trong đời sống hàng ngày.\r\n\r\nCác loại rau củ, trái cây được nhân cách hóa sẽ đưa các bé phiêu lưu vào một thế giới mới lạ, khám phá vô vàn điều hay.\r\n\r\nNhờ vào những câu chuyện ngắn, dễ hiểu trong bộ sách này bé sẽ trải qua một hành trình phát triển ngôn ngữ, tưởng tượng, và sự tò mò một cách tự nhiên và thú vị.\r\n\r\nVì sao nên chọn bộ sách Ehon “Sức mạnh của những người bạn trái cây” cho trẻ\r\n\r\n•  Giúp kích thích thị giác: Nhờ vào khổ sách to kết hợp với hình ảnh và màu sắc nổi bật (xanh, đỏ, vàng, tím…)\r\n\r\n•  Phát triển EQ: Con sẽ học được cách điều hoà cảm xúc tích cực khi được hòa mình vào các nhân vật với nhiều cung bậc cảm xúc khác nhau như vui vẻ, hạnh phúc, ngạc nhiên, hay buồn bã, tức giận…\r\n\r\n•  Phát triển trí thông minh IQ: Sách Ehon không chỉ tác động đến thị giác mà còn ảnh hưởng tới khả năng tư duy, cách giải quyết vấn đề giúp con rèn luyện trí thông minh.\r\n\r\n•  Phát triển ngôn ngữ: Từ ngữ Ehon giúp khơi gợi và bồi đắp vốn từ vựng phong phú cho trẻ.\r\n\r\n•  Gắn kết tình cảm gia đình: Thông qua giọng đọc ấm áp của cha mẹ là cách tuyệt vời để tăng cường sự gắn kết, giúp con cảm thấy an toàn, gần gũi.', 'Uploads/682aadb8b3387_suc-manh-cua-nhung-nguoi-ban-trai-cay-giai-cuu-dau-tay-khoi-quai-vat-nam-moc.jpg', 0, '2025-05-19 04:04:08', 'phat-trien-quan-sat'),
(44, 'Sách Ehon - Chiếc Miệng Xinh, Nói Lời Đẹp - Khi Ở Nhà', 'Kayo Takatera', 9010.00, 'Hãy để bộ sách Ehon siêu thú vị mang tên “Chiếc miệng xinh, nói lời đẹp” giúp con phát triển đa giác quan và học hỏi vô vàn điều bổ ích nhé.\r\n\r\nBộ sách này bao gồm 3 chủ đề gần gũi:\r\n\r\nKhi ra ngoài\r\nKhi ở nhà\r\nKhi muốn kết bạn\r\nBộ sách giúp con khám phá thêm rất nhiều điều mới mẻ về thế giới xung quanh, xây dựng các mối quan hệ và còn học hỏi được nhiều điều bổ ích đấy!\r\n\r\nHình thức hỏi đáp của sách cũng làm tăng tính tương tác giữa bố mẹ và các bé, giúp trẻ tiếp thu tốt và ghi nhớ lâu.\r\n\r\nSách có kích thước nhỏ gọn và được làm bằng chất liệu giấy bồi cao cấp nên rất dễ dàng cho trẻ cầm sách lật mở và có độ an toàn cao.\r\n\r\nĐặc biệt bộ sách Ehon này còn mang tới rất nhiều lợi ích cho trẻ, bố mẹ nhất định không thể bỏ qua:\r\n\r\n•  Phát triển khả năng ngôn ngữ: Khi đọc sách, trẻ sẽ được tiếp nhận với những từ vựng mới, đồng thời hiểu được nghĩa của từ trong những hoàn cảnh cụ thể. Đặc biệt, khi nghe giọng nói biểu cảm và ngữ điệu của bố mẹ cũng sẽ giúp con làm quen với âm thanh, kích thích tư duy ngôn ngữ.\r\n\r\n•  Học hỏi điều hay, rèn thói quen tốt:  Qua  mỗi tình huống được đưa ra, bé sẽ được học cách ứng xử sao cho lịch sự và văn minh, đồng thời biết quan tâm sẻ chia với mọi người nữa đấy.\r\n\r\n•  Kích thích trí tò mò: Với 3 chủ đề quen thuộc (Khi ở nhà, khi ra ngoài, khi muốn kết bạn), bộ Ehon này sẽ giúp con khám phá rất nhiều điều mới mẻ xung quanh để con cảm nhận được một thể giới ngoài kia vô cùng tươi mới và đẹp đẽ.', 'Uploads/682aae151b98b_chiec-mieng-xinh-khi-o-nha.jpg', 0, '2025-05-19 04:05:41', 'phat-trien-quan-sat'),
(45, 'Sách Ehon - Chiếc Miệng Xinh, Nói Lời Đẹp - Khi Muốn Kết Bạn', 'Kayo Takatera', 9000.00, 'Hãy để bộ sách Ehon siêu thú vị mang tên “Chiếc miệng xinh, nói lời đẹp” giúp con phát triển đa giác quan và học hỏi vô vàn điều bổ ích nhé.\r\n\r\nBộ sách này bao gồm 3 chủ đề gần gũi:\r\n\r\nKhi ra ngoài\r\nKhi ở nhà\r\nKhi muốn kết bạn\r\nBộ sách giúp con khám phá thêm rất nhiều điều mới mẻ về thế giới xung quanh, xây dựng các mối quan hệ và còn học hỏi được nhiều điều bổ ích đấy!\r\n\r\nHình thức hỏi đáp của sách cũng làm tăng tính tương tác giữa bố mẹ và các bé, giúp trẻ tiếp thu tốt và ghi nhớ lâu.\r\n\r\nSách có kích thước nhỏ gọn và được làm bằng chất liệu giấy bồi cao cấp nên rất dễ dàng cho trẻ cầm sách lật mở và có độ an toàn cao.\r\n\r\nĐặc biệt bộ sách Ehon này còn mang tới rất nhiều lợi ích cho trẻ, bố mẹ nhất định không thể bỏ qua:\r\n\r\n•  Phát triển khả năng ngôn ngữ: Khi đọc sách, trẻ sẽ được tiếp nhận với những từ vựng mới, đồng thời hiểu được nghĩa của từ trong những hoàn cảnh cụ thể. Đặc biệt, khi nghe giọng nói biểu cảm và ngữ điệu của bố mẹ cũng sẽ giúp con làm quen với âm thanh, kích thích tư duy ngôn ngữ.\r\n\r\n•  Học hỏi điều hay, rèn thói quen tốt:  Qua  mỗi tình huống được đưa ra, bé sẽ được học cách ứng xử sao cho lịch sự và văn minh, đồng thời biết quan tâm sẻ chia với mọi người nữa đấy.', 'Uploads/682aae479d850_chiec-mieng-xinh-khi-muon-ket-ban.jpg', 0, '2025-05-19 04:06:31', 'phat-trien-quan-sat'),
(46, 'Sách Bìa Cứng Cho Bé - Phát Triển Sáng Tạo - Những Con Số Quanh Ta (Gomi Taro)', 'Gomi Taro', 6000.00, '1️⃣2️⃣3️⃣ Chúng ta yêu những con số như thế nào? Hãy cùng khám phá: Chúng hiện diện trên biển báo đường phố, trạm xe buýt, điện thoại, nhiệt kế, bảng viết và cân. Chúng cho ta biết thời gian, ngày tháng, và giúp đo lường khoảng cách, kích thước, cùng vô vàn điều thú vị khác.\r\n\r\nCuốn sách tranh đầy cảm hứng của tác giả và họa sĩ minh họa nổi tiếng Nhật Bản Gomi Taro sẽ mang đến sự thích thú và kiến thức bổ ích cho các em bé mới bắt đầu làm quen với chữ số, mở ra một góc nhìn độc đáo và vô cùng hữu ích về khái niệm “số” quan trọng trong cuộc sống hàng ngày.\r\n\r\n???? Gomi Taro là một trong những tác giả và họa sĩ minh họa nổi tiếng nhất Nhật Bản, được yêu mến trên toàn thế giới. Ông đã sáng tác hơn 350 cuốn sách dành cho độc giả ở mọi lứa tuổi, từ trẻ nhỏ đến người lớn. Những tác phẩm của Gomi Taro luôn mang phong cách minh họa độc đáo, gần gũi và nội dung giàu ý nghĩa, giúp trẻ em khám phá thế giới xung quanh một cách thú vị và sáng tạo.\r\n\r\nVới sự nghiệp kéo dài qua nhiều thập kỷ, Gomi Taro đã trở thành một cái tên không thể thiếu trong thế giới sách thiếu nhi.\r\n\r\n???? Tóm tắt: Những con số xuất hiện ở khắp nơi xung quanh chúng mình đấy!\r\n\r\nChúng hiển thị thời gian, ngày tháng, đo lường khoảng cách và kích cỡ.\r\n\r\nCon số xuất hiện ở khắp mọi nơi, chúng mình cùng đi tìm hiểu nhé!\r\n\r\n☀️ Ehon là loại sách được ba mẹ Nhật Bản tin yêu lựa chọn trong quá trình giáo dục trẻ nhỏ. Sách Ehon nhà Mogu được sáng tác dựa trên nghiên cứu tâm lý và suy nghĩ của trẻ.\r\n\r\nVới nội dung đa dạng chủ đề, nhấn mạnh vào minh họa sáng tạo và ngôn từ đậm chất trẻ con. Ehon chắc chắn sẽ giúp trẻ nuôi dưỡng tâm hồn và thôi thúc sự tự tin theo cách của riêng con.\r\n\r\nNgoài ra, đọc Ehon cùng con mỗi ngày chính là sợi dây đặc biệt gắn kết ba mẹ với con.', 'Uploads/682aaed716d50_nhung-con-so-quanh-ta.jpg', 0, '2025-05-19 04:08:55', 'phat-trien-sang-tao'),
(47, 'Combo Em Bé Thích Sáng Tạo', 'Ataki', 124000.00, 'Thông tin chung\r\nBộ 4 cuốn \"Bestseller\" của tác giả Gomi Taro rất được trẻ em ở Nhật Bản yêu thích. Đặc trưng của tác giả là cách sử dụng hình khối và màu sắc tương phản, kết hợp một cách sáng tạo để kích thích thị giác của trẻ.\r\n\r\nSách được thiết kế với số lượng chữ tối thiểu, tập trung vào hình ảnh và màu sắc, nhằm khuyến khích trẻ phát triển tư duy sáng tạo và logic.\r\n\r\nBa mẹ ơi, đây không chỉ là sách mà còn là cánh cửa mở ra một thế giới mới, kích thích trí tưởng tượng và khuyến khích sự phát triển toàn diện cho trí não nhạy bén của trẻ em.\r\n\r\n \r\n\r\nCOMBO PHÁT TRIỂN SÁNG TẠO GỒM 4 CUỐN:\r\n???? \"Đi Đến Tận Đâu\":\r\nCậu bé dạo chơi khám phá những điều thú vị và gặp gỡ cảnh vật đầy bất ngờ. Quay về nhà liệu cậu có kịp không?\r\n\r\n???? \"Giống Nhau Nhỉ\":\r\nCuộc trò chuyện ngộ nghĩnh giữa ngựa và chiếc ghế, tìm ra những điểm tương đồng đầy thú vị giữa hai đối tưởng khác mà lại giống nhau.\r\n\r\n???? \"Nếu là Cậu Thì Làm Thế Nào?\":\r\nTruyện với 13 tình huống khác nhau, khích lệ trẻ suy nghĩ và giải quyết vấn đề với câu hỏi \"Nếu là cậu, cậu sẽ làm thế nào?\"\r\n\r\n???? \"Những Người Bạn Trên Cơ Thể\":\r\nCuộc trò chuyện giữa các bộ phận cơ thể xoay quanh chiếc kẹo bị bỏ quên trong túi quần của cậu bé.', 'Uploads/682aaf3578ecd_combo-be-thich-sang-tao.jpg', 0, '2025-05-19 04:10:29', 'phat-trien-sang-tao'),
(48, 'Trước Tiên Đợi Chút Nhé', 'Gomi Taro', 67000.00, 'Tại sao lại là sách sáng tạo ba mẹ nhỉ?\r\nSách của Gomi Taro có nét đặc trưng là hình vẽ đơn sắc, có phần nguệch ngoạc và đơn điệu, nhưng đó chính là điểm nổi bật của Ehon hay cách nuôi dạy con của người Nhật. Hãy để trẻ tự tưởng tượng, tư duy theo suy nghĩ của con, giúp con tự tin vào chính câu chuyện của mình.\r\n\r\n“Khi xem sách của chúng tôi trẻ con có thể thấy buồn ngủ vì chẳng còn việc gì để chúng làm nữa. Nhưng các tác giả Nhật Bản thì khác. Gomi Taro luôn kéo trẻ con vào cuộc chơi trong các tác phẩm của ông. Tôi thấy cái đó là rất thông minh. Trẻ em rất thích vì trẻ được tham gia vào câu chuyện, xử lý tình huống. Tác giả không làm hết việc mà để các em có cơ hội tham gia” – nhà thơ Trần Đăng Khoa nói.\r\n\r\nCuốn ehon này sẽ giúp con rèn luyện tính kiên nhẫn thông qua các tình huống thân thuộc hàng ngày. Cụm từ \"đợi chút nhé\" được lặp đi lặp lại cũng góp phần xây dựng thói quen chờ đợi của trẻ trong cuộc sống. Câu nói “đợi chút nhé” giờ đây đã được sáng tạp trong thật nhiều các tình huống khác nhau, giúp trẻ tăng khả năng sáng tạo và phát triển ngôn ngữ.\r\n\r\n \r\n\r\n???? Tóm tắt\r\nTrong cuộc sống hàng ngày chúng ta sẽ gặp rất nhiều việc không thể hoàn thành ngay lập tức mà phải cần có thời gian chờ đợi. Có thể là chờ đợi món ăn khi đi ăn nhà hàng, chờ đợi ở ga tàu, bến xe. Chờ đợi để được đi vệ sinh,…chờ đợi từ khi vẫn ở thời nguyên thủy cho đến xã hội hiện đại bây giờ. Thế nhưng, chờ đợi có làm bạn thấy khó khăn và vất vả không?\r\n\r\n \r\n\r\n???? Đối tượng độc giả\r\nĐọc cho bé: từ 3 tuổi trở lên\r\n\r\nBé tự đọc: từ 6 tuổi trở lên', 'Uploads/682aaf8b9bd4c_doi-chut-nhe.jpg', 0, '2025-05-19 04:11:55', 'phat-trien-sang-tao'),
(49, 'Trước Tiên Xin Lỗi Nhé', 'Gomi', 33560.00, '????CUỐN TRUYỆN NÀY CÓ GÌ SÁNG TẠO?\r\n\r\n- Nét vẽ đặc biệt, mang nét riêng của tác giả Gomi Taro khiến bé không thể rời mắt\r\n\r\n- Nội dung mới lạ, giúp bé hiểu về văn hóa Nhật Bản với sức mạnh diệu kỳ của lời xin lỗi\r\n\r\n- Câu nói “Xin lỗi nhé!” được sử dụng ở nhiều tình huống khác nhau, giúp trẻ dễ dàng áp dụng vào đời sống hàng ngày. Thông điệp của cuốn sách là: Xin lỗi là một cách nói chuyện lịch sự, lời xin lỗi mang một sức mạnh diệu kỳ dù trong bất cứ tình huống nào. Con hãy trở thành một em bé lịch sự và không ngại nói lời xin lỗi nhé!\r\n\r\n????TẠI SAO SÁCH GOMI TARO ĐƯỢC MỆNH DANH LÀ “SÁCH SÁNG TẠO”?\r\n\r\nSách của Gomi Taro có nét đặc trưng là hình vẽ đơn sắc, có phần nguệch ngoạc và đơn điệu, nhưng đó chính là điểm nổi bật của Ehon hay cách nuôi dạy con của người Nhật. ????????̃???? đ????̂̉ ????????????̉ ????????̛̣ ????????̛????̛̉???????? ????????̛????̛̣????????, ????????̛ ???????????? ???????????????? ???????????? ????????????????̃ ????????̉???? ????????????, ????????????́???? ???????????? ????????̛̣ ???????????? ????????̀???? ????????????́???????? ????????̂???? ????????????????????̣̂???? ????????̉???? ????????̀????????.\r\n\r\n“Khi xem sách của chúng tôi trẻ con có thể thấy buồn ngủ vì chẳng còn việc gì để chúng làm nữa. Nhưng các tác giả Nhật Bản thì khác. Gomi Taro luôn kéo trẻ con vào cuộc chơi trong các tác phẩm của ông. Tôi thấy cái đó là rất thông minh. Trẻ em rất thích vì trẻ được tham gia vào câu chuyện, xử lý tình huống. Tác giả không làm hết việc mà để các em có cơ hội tham gia” – nhà thơ Trần Đăng Khoa nói\r\n\r\n???? Tóm tắt\r\nLời xin lỗi mang một sức mạnh rất kì diệu. Dù trong bất kỳ hoàn cảnh nào, trước tiên chúng ta phải nói lời xin lỗi nhé! Qua cuốn sách là 11 lời xin lỗi khác nhau, lời xin lỗi đôi khi là một phép lịch sự, là sự biết lỗi hay là cách nói của trẻ muốn lặp lại khi biết nói xin lỗi nhỉ. Các bạn nhỏ hãy cùng Mogu tìm hiểu nhé!\r\n\r\n???? Đối tượng độc giả\r\nĐọc cho bé: từ 2 tuổi trở lên\r\n\r\nBé tự đọc: từ 6 tuổi trở lên', 'Uploads/682aafee4358c_truoc-tien-xin-loi-nhe.jpg', 0, '2025-05-19 04:13:34', 'phat-trien-sang-tao'),
(50, 'Châu Chấu Đi Dạo', 'Gomi', 34000.00, 'Tại sao lại là sách sáng tạo ba mẹ nhỉ?\r\nSách của Gomi Taro có nét đặc trưng là hình vẽ đơn sắc, có phần nguệch ngoạc và đơn điệu, nhưng đó chính là điểm nổi bật của Ehon hay cách nuôi dạy con của người Nhật. Hãy để trẻ tự tưởng tượng, tư duy theo suy nghĩ của con, giúp con tự tin vào chính câu chuyện của mình.\r\n\r\n“Khi xem sách của chúng tôi trẻ con có thể thấy buồn ngủ vì chẳng còn việc gì để chúng làm nữa. Nhưng các tác giả Nhật Bản thì khác. Gomi Taro luôn kéo trẻ con vào cuộc chơi trong các tác phẩm của ông. Tôi thấy cái đó là rất thông minh. Trẻ em rất thích vì trẻ được tham gia vào câu chuyện, xử lý tình huống. Tác giả không làm hết việc mà để các em có cơ hội tham gia” – nhà thơ Trần Đăng Khoa nói.\r\n\r\nNằm trong số những tác phẩm của tác giả nổi tiếng Gomi Taro, truyện được xuất bản lần đầu năm 1989. Truyện có nét vẽ đơn giản nhưng mô tả được nhiều bối cảnh, tình huống khiến trẻ thích thú tìm hiểu. Đặc biệt, truyện sử dụng nhiều từ tượng thanh cho mỗi vật liệu khác nhau\r\n\r\n???? Tóm tắt\r\nMỗi bước nhảy của bạn Châu Chấu sẽ dẫn các bạn nhỏ đi đâu nhỉ? Những nơi ấy có gì thú vị? Cùng bạn Châu Chấu đi dạo nào!\r\n\r\n???? Đối tượng độc giả\r\nĐọc cho bé: từ 2 tuổi trở lên \r\n\r\nBé tự đọc: từ 6 tuổi trở lên.', 'Uploads/682ab03d3dce8_chau-chau-di-dao.jpg', 0, '2025-05-19 04:14:53', 'phat-trien-sang-tao');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `date` date DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `speaker_name` varchar(255) DEFAULT NULL,
  `speaker_avatar` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `date`, `image_url`, `location`, `speaker_name`, `speaker_avatar`, `author`, `created_at`) VALUES
(1, 'Mẹ Bầu Em Bé', 'Festival mẹ bầu và em bé 2023 đã quay trở lại có gì đặc biệt -KidsPlaza', '2025-07-07', 'admin/Uploads/event1.jpg', 'Nhà thi đấu quận 12 – 493 Dương Thị Mười, Hiệp Thành, Quận 12', 'EllWordls', 'Uploads/682da44af0db1_f2.jpg', 'Ktazo', '2025-05-17 12:49:38'),
(2, 'Hành Trình Yêu Thương', 'Dành cho các bé yêu là một dịp đặc biệt, nơi câu thần chú “Hãy biến đêm này thành khu vườn cổ tích với những cô công chúa và hoàng tử xinh đẹp” trở thành sự thật.', '2025-08-08', 'admin/Uploads/event2.jpg', 'Tầng 4 Tòa nhà CT2 - Bắc Hà C14, đường Tố Hữu, P.Trung Văn, Q.Nam Từ Liêm, Hà Nội', 'Jason Tanamor', 'Uploads/682da4aab3115_f3.jpg', 'Kate Ristau', '2025-05-17 12:49:38'),
(3, 'DẠY CON TRONG HẠNH PHÚC', 'Bạn có đang gặp phải những vấn đề này khi nuôi dạy con?\r\n❗️Con cái cãi lời, hay chống đối?\r\n❗️Cảm giác mất kết nối với con?\r\n❗️Áp lực từ kỳ vọng xã hội?\r\nVậy thì bạn cần phải đọc cuốn sách “Dạy con trong hạnh phúc” của Thầy Bùi Gia Hiếu – Chủ tịch HĐQT Hệ thống trường Tre Việt (Bamboo) – không chỉ mang đến kiến thức mà còn là hành trình đầy cảm xúc, giúp mỗi bậc cha mẹ tìm thấy sự bình yên trong việc nuôi dạy con cái.\r\nTại sao bạn cần sở hữu cuốn sách này?\r\n????Triết lý \"Nên người\" thay vì \"Hơn người”\r\n- Đặt trọng tâm vào việc nuôi dưỡng nhân cách, giá trị đạo đức và cảm xúc lành mạnh thay vì chỉ chạy theo thành tích.\r\n????15 phương pháp giáo dục thực tế, dễ áp dụng\r\n- Từ \"Kỷ luật tích cực\" giúp trẻ phát triển mà không gây tổn thương, đến \"Car-Schooling\" – tận dụng thời gian di chuyển để giáo dục trẻ một cách sáng tạo.\r\n- Đi kèm bảng biểu, kế hoạch và bài tập thực hành cụ thể.\r\n????Phù hợp với gia đình Việt Nam\r\n- Được viết bởi một nhà giáo dục người Việt – Thầy Bùi Gia Hiếu, với sự thấu hiểu sâu sắc về giá trị gia đình Việt Nam.\r\n- Các bài học và phương pháp được thiết kế để tương thích với lối sống, văn hóa và tâm lý của cha mẹ Việt.\r\n------', '2025-05-19', 'admin/Uploads/event3.jpg', 'Bamboo School Tân Phú 13B-15 Nguyễn Trọng Quyền, P. Tân Thới Hòa, Q. Tân Phú, TP. HCM', 'Mariah Bla', 'Uploads/682da2f82a8e6_f4.jpg', 'Virginia Gewin', '2025-05-17 12:49:38'),
(4, 'Cùng Con Đón Tết Ý Nghĩa', 'Ba mẹ có thể làm gì cùng con?\r\nHướng dẫn con lau dọn, sắp xếp lại đồ chơi, sách vở.\r\nCùng con trang trí nhà cửa bằng hoa mai, hoa đào, câu đối đỏ.\r\nBiến việc dọn dẹp thành trò chơi vui nhộn để bé hứng thú hơn.\r\n\r\nGiúp bé phát triển tính tự giác, hiểu ý nghĩa của sự chuẩn bị cho năm mới.', '2025-12-09', 'Uploads/682da68572ff4_f6.png', 'NV22 khu 12 ngõ 13 đường Lĩnh Nam, phường Mai Động, quận Hoàng Mai, Thành Phố Hà Nội', 'Anime', 'Uploads/682da685752fc_f5.jpg', 'Hikito', '2025-05-21 10:10:13'),
(5, 'Phát triển cảm xúc sớm cho trẻ từ 1 tuổi', 'Phát triển EQ (Emotional Quotient) từ sớm giúp trẻ xây dựng kỹ năng quản lý cảm xúc, thấu hiểu bản thân và người khác, từ đó tạo nền tảng vững chắc cho sự thành công trong cuộc sống sau này. Dưới đây là một số cách giúp trẻ phát triển EQ sớm', '2025-12-02', 'Uploads/682da76c00dd6_f7.jpg', '123B, phường 15, quận 1, thành phố Hồ Chí Minh', 'Dover', 'Uploads/682da76c01354_f8.jpg', 'Yi Long Ma', '2025-05-21 10:14:04');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `district` varchar(100) NOT NULL,
  `ward` varchar(100) NOT NULL,
  `note` varchar(500) DEFAULT NULL,
  `payment_method` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'pending',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `total_price` decimal(15,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `email`, `name`, `phone`, `address`, `city`, `district`, `ward`, `note`, `payment_method`, `status`, `created_at`, `total_price`) VALUES
(1, 1, 'g@gmail.com', 'hhh', '7878798989', 'jjjkkj', 'jhjkjjk', 'jhjjk', 'jkjkk', 'mnknmlk', 'hhh', 'completed', '2025-05-17 18:13:48', 0.00),
(11, 6, 'hh@gmail.com', 'adafa', '23442', 'adfaf', 'Tỉnh Hà Giang', 'Huyện Mèo Vạc', 'Xã Pả Vi', '', 'cod', 'pending', '2025-05-19 18:34:17', 102.00),
(12, 4, '', 'gfsgsgda', '34235242', 'hjkj', 'Tỉnh Thái Nguyên', 'Huyện Phú Lương', 'Xã Động Đạt', '', 'cod', 'pending', '2025-05-22 16:40:12', 34000.00),
(13, 4, '', 'ghghg', '57657', 'jshgdksg', 'Tỉnh Yên Bái', 'Huyện Lục Yên', 'Xã Vĩnh Lạc', '', 'vnpayqr', 'pending', '2025-05-24 19:08:34', 120800.00),
(14, 4, '', 'hjjhj', '677', 'âf', 'Tỉnh Quảng Ninh', 'Huyện Vân Đồn', 'Xã Thắng Lợi', '', 'vnpayqr', 'pending', '2025-05-24 19:25:32', 120800.00),
(15, 4, '', 'mjhhj', '68768', 'bj', 'Tỉnh Quảng Ninh', 'Huyện Hải Hà', 'Xã Quảng Long', '', 'vnpayqr', 'pending', '2025-05-24 19:28:43', 120800.00),
(16, 4, '', 'mjhhj', '68768', 'bj', 'Tỉnh Quảng Ninh', 'Huyện Hải Hà', 'Xã Quảng Long', '', 'vnpayqr', 'pending', '2025-05-24 19:29:26', 120800.00),
(17, 4, '', 'mjhhj', '68768', 'bj', 'Tỉnh Quảng Ninh', 'Huyện Hải Hà', 'Xã Quảng Long', '', 'vnpayqr', 'pending', '2025-05-24 19:32:34', 120800.00),
(18, 4, '', 'jhjhjk', '4656', 'jgjhkj', 'Tỉnh Phú Thọ', 'Huyện Thanh Sơn', 'Xã Khả Cửu', '', 'vnpayqr', 'pending', '2025-05-24 19:33:01', 120800.00),
(19, 4, '', 'jhkjkj', '576576', 'khjkj', 'Tỉnh Bắc Giang', 'Huyện Sơn Động', 'Xã An Bá', '', 'vnpayqr', 'pending', '2025-05-24 19:35:22', 120800.00),
(20, 4, '', 'jhjkjk', '56677', 'hjjh', 'Tỉnh Bắc Giang', 'Huyện Sơn Động', 'Xã An Bá', '', 'vnpayqr', 'pending', '2025-05-24 19:39:45', 120800.00),
(21, 4, '', 'hjhjj', '676234', 'dsfg', 'Tỉnh Quảng Ninh', 'Huyện Vân Đồn', 'Xã Bản Sen', '', 'vnpayqr', 'pending', '2025-05-24 19:43:31', 120800.00),
(22, 4, '', 'fsgsg', '4535', 'fsgsg', 'Tỉnh Bắc Giang', 'Thị xã Việt Yên', 'Phường Ninh Sơn', '', 'vnpayqr', 'pending', '2025-05-24 19:45:19', 120800.00),
(23, 4, '', 'kjkk', '67768', 'kjkj', 'Tỉnh Bắc Giang', 'Huyện Lục Ngạn', 'Xã Phú Nhuận', '', 'vnpayqr', 'pending', '2025-05-24 19:51:37', 120800.00),
(24, 4, '', 'kjkkl', '68768', 'kjkk', 'Tỉnh Thái Nguyên', 'Huyện Phú Bình', 'Xã Điềm Thụy', '', 'vnpayqr', 'pending', '2025-05-24 19:54:02', 120800.00),
(25, 4, '', 'jhjkkj', '76768', 'hjjkj', 'Tỉnh Quảng Ninh', 'Thị xã Quảng Yên', 'Phường Phong Hải', '', 'vnpayqr', 'pending', '2025-05-24 20:16:56', 123491.00),
(26, 6, '', 'sfafaf', '241314', 'afafd', 'Tỉnh Quảng Ninh', 'Huyện Hải Hà', 'Xã Quảng Long', '', 'vnpayqr', 'pending', '2025-05-25 09:40:36', 59600.00),
(27, 6, '', 'gsgfsdg', '3452542', 'sdfgsfgsgf', 'Tỉnh Phú Thọ', 'Huyện Cẩm Khê', 'Xã Phú Khê', '', 'vnpayqr', 'pending', '2025-05-25 09:41:26', 59600.00),
(28, 6, '', 'kkkl', '342342', 'adafaf', 'Tỉnh Quảng Ninh', 'Huyện Vân Đồn', 'Xã Hạ Long', '', 'vnpayqr', 'pending', '2025-05-25 10:16:53', 59600.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `book_id`, `quantity`, `price`) VALUES
(1, 1, 1, 4, 4.00),
(2, 11, 32, 3, 34.00),
(3, 12, 32, 1, 34000.00),
(4, 13, 32, 3, 34000.00),
(5, 14, 32, 3, 34000.00),
(6, 15, 32, 3, 34000.00),
(7, 16, 32, 3, 34000.00),
(8, 17, 32, 3, 34000.00),
(9, 18, 32, 3, 34000.00),
(10, 19, 32, 3, 34000.00),
(11, 20, 32, 3, 34000.00),
(12, 21, 32, 3, 34000.00),
(13, 22, 32, 3, 34000.00),
(14, 23, 32, 3, 34000.00),
(15, 24, 32, 3, 34000.00),
(16, 25, 32, 3, 34000.00),
(17, 25, 41, 1, 2990.00),
(18, 26, 32, 1, 34000.00),
(19, 27, 32, 1, 34000.00),
(20, 28, 32, 1, 34000.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'Nguyen Van A', 'a@gmail.com', '12345678', 'admin', '2025-05-16 08:10:01'),
(2, 'Tran Thi B', 'b@gmail.com', 'hashed_password_b', 'user', '2025-05-16 08:10:01'),
(4, 'h', 'h@gmail.com', '$2y$10$WgaUMrIGP0G.18paSBkv9u5EquCuu2DIaLH4ZAm2EW4d5dh4HQ8Ae', 'admin', '2025-05-16 10:00:50'),
(5, 'ddfdfdf', 'd@gmail.com', '$2y$10$giWN89EUf5l8gSJjmiidq.pPsZwcU8oGGeY4QCkZRSMDX0oZ1c.zm', 'user', '2025-05-18 16:02:51'),
(6, 'ddfdfdf', 't@gmail.com', '$2y$10$mXBKD7saIuFsmPueQp.70uvdFsY8jDyzqtZh3g8Qn08CSttmSPNlu', 'user', '2025-05-18 16:02:57');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_user` (`user_id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT cho bảng `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
