#IfWinActive BoardGameGeek

;c-> case sensitive
;?-> even inside a word
;*-> ending caracter not needed (spase,return)  
;o-> ommit ending caracter

;----------;
;---dice---;
;----------;
:co:DDb::1custom6{{}iid:1311394;iid:1311395;iid:1311396;iid:1311397;iid:1311398;iid:1311399{}}
:co:DDr::1custom6{{}iid:1311403;iid:1311403;iid:1311403;iid:1311404;iid:1311405;iid:1311406{}}
:co:DDy::1custom6{{}iid:1311411;iid:1311412;iid:1311413;iid:1311414;iid:1311415;iid:1311416{}}
:co:DDv::1custom6{{}iid:1774141;iid:1774142;iid:1774143;iid:1774144;iid:1774145;iid:1774146{}}
:co:DDm::1custom6{{}iid:1311400;iid:1311400;iid:1311401;iid:1311401;iid:1311401;iid:1311402{}}
:co:DDg::1custom6{{}iid:1311407;iid:1311407;iid:1311407;iid:1311408;iid:1311409;iid:1311410{}}
:co:DDn::1custom6{{}iid:1311390;iid:1311390;iid:1311390;iid:1311391;iid:1311392;iid:1311393{}}

:co:DDa::1custom6{{}iid:1311390;iid:1311390;iid:1311390;iid:1311391;iid:1311392;iid:1311393{}}{+}1custom6{{}iid:1311407;iid:1311407;iid:1311407;iid:1311408;iid:1311409;iid:1311410{}}

:co:DDby::1custom6{{}iid:1311394;iid:1311395;iid:1311396;iid:1311397;iid:1311398;iid:1311399{}}{+}1custom6{{}iid:1311411;iid:1311412;iid:1311413;iid:1311414;iid:1311415;iid:1311416{}}
:co:DDb2y::1custom6{{}iid:1311394;iid:1311395;iid:1311396;iid:1311397;iid:1311398;iid:1311399{}}{+}2custom6{{}iid:1311411;iid:1311412;iid:1311413;iid:1311414;iid:1311415;iid:1311416{}}
:co:DDbr::1custom6{{}iid:1311394;iid:1311395;iid:1311396;iid:1311397;iid:1311398;iid:1311399{}}{+}1custom6{{}iid:1311403;iid:1311403;iid:1311403;iid:1311404;iid:1311405;iid:1311406{}}
:co:DDb2r::1custom6{{}iid:1311394;iid:1311395;iid:1311396;iid:1311397;iid:1311398;iid:1311399{}}{+}2custom6{{}iid:1311403;iid:1311403;iid:1311403;iid:1311404;iid:1311405;iid:1311406{}}
:co:DDbry::1custom6{{}iid:1311394;iid:1311395;iid:1311396;iid:1311397;iid:1311398;iid:1311399{}}{+}1custom6{{}iid:1311403;iid:1311403;iid:1311403;iid:1311404;iid:1311405;iid:1311406{}}{+}1custom6{{}iid:1311411;iid:1311412;iid:1311413;iid:1311414;iid:1311415;iid:1311416{}}

:co:DD2m::2custom6{{}iid:1311400;iid:1311400;iid:1311401;iid:1311401;iid:1311401;iid:1311402{}}
:co:DD2g::2custom6{{}iid:1311407;iid:1311407;iid:1311407;iid:1311408;iid:1311409;iid:1311410{}}
:co:DDgm::1custom6{{}iid:1311407;iid:1311407;iid:1311407;iid:1311408;iid:1311409;iid:1311410{}}{+}1custom6{{}iid:1311400;iid:1311400;iid:1311401;iid:1311401;iid:1311401;iid:1311402{}}
:co:DDg2m::1custom6{{}iid:1311407;iid:1311407;iid:1311407;iid:1311408;iid:1311409;iid:1311410{}}{+}2custom6{{}iid:1311400;iid:1311400;iid:1311401;iid:1311401;iid:1311401;iid:1311402{}}
:co:DDngm::1custom6{{}iid:1311390;iid:1311390;iid:1311390;iid:1311391;iid:1311392;iid:1311393{}}{+}1custom6{{}iid:1311407;iid:1311407;iid:1311407;iid:1311408;iid:1311409;iid:1311410{}}{+}1custom6{{}iid:1311400;iid:1311400;iid:1311401;iid:1311401;iid:1311401;iid:1311402{}}

;----------------;
;---attributes---;
;----------;-----;
:c*:DSTR::[ImageID=2625365 original inline] ; strength            
:c*:DKNO::[ImageID=2625366 original inline] ; knowledge  
:c*:DWIL::[ImageID=2625367 original inline] ; willpower          
:c*:DAWA::[ImageID=2625368 original inline] ; awareness

;----------;
;---others-;
;----------;
:co:DA::[ImageID=2625358 original inline] 		; generic action
:c:DAm::[ImageID=2625358 original inline] move 		; specific action
:c:DAa::[ImageID=2625358 original inline] attack 	; specific action
:c:DAs::[ImageID=2625358 original inline] search 	; specific action
:c:DAo::[ImageID=2625358 original inline] open 		; specific action
:c:DAc::[ImageID=2625358 original inline] close 	; specific action

:c*?:DMP::[ImageID=2625359 original inline] ; movement point   
:c*?:DFA::[ImageID=2625360 original inline] ; fatigue, stamina  
:c*?:DHP::[ImageID=2625361 original inline] ; heart 
:c*?:DSH::[ImageID=2625362 original inline] ; shield  
:c*?:DSU::[ImageID=2625363 original inline] ; surge  
:c*?:DMAP::[size=18][url=X]MAP[/url][/size] ; template for map url

;-------------;
;---banners---;
;-------------;

;OL and admin
:*:DB_ol::[imageid=3167412 original]
:*:DB_o2::[img]http://i.imgur.com/0tFctFa.jpg[/img]
:*:DB_mod::[imageid=2979590 original]
:*:DB_voice::[imageid=3957345 original]

:c*:DBalr::[img]http://i.imgur.com/17o0P3S.png[/img]		;Alys Raine
:c*:DBanr::[imageid=3167389 original]				;Andira Runehand
:c*:DBaw::[img]http://i.imgur.com/lpPKETv.png[/img]		;Arvel Worldwalker
:c*:DBash::[img]http://i.imgur.com/89P72gP.png[/img]		;Ashrian
:c*:DBast::[img]http://i.imgur.com/uV5RRNs.png[/img]		;Astarra
:c*:DBag::[img]http://i.imgur.com/tLjTBsz.png[/img]		;Augur Grisom
:c*:DBaa::[img]http://i.imgur.com/JHNMe0P.png[/img]		;Avric Albright
:c*:DBbg::[img]http://i.imgur.com/QW27ArT.png[/img]		;Brother Gherinn
:c*:DBch::[img]http://i.imgur.com/ja3WK2O.png[/img]		;Challara
:c*:DBco::[img]http://i.imgur.com/VWSdK1x.png[/img]		;Corbin
:c*:DBdv::[img]http://i.imgur.com/Qy2lueF.png[/img]		;Dezra the Vile
:c*:DBem::[img]http://i.imgur.com/ReuRIBr.png[/img]		;Elder Mok
:c*:DBgk::[img]http://i.imgur.com/vrr1Vxv.png[/img]		;Grey Ker
:c*:DBgt::[img]http://i.imgur.com/vgX8blN.png[/img]		;Grisban the thirsty
:c*:DBmq::[imageid=3167390 original]				;High Mage Quellen
:c*:DBi::[img]http://i.imgur.com/TowM4qe.png[/img]		;Ispher
:c*:DBje::[img]http://i.imgur.com/xF6nyVS.png[/img]		;Jaes the Exile
:c*:DBjf::[img]http://i.imgur.com/BhMmyaL.png[/img]		;Jain Fairwood
:c*:DBjk::[img]http://i.imgur.com/sW3Dr8V.png[/img]		;Jonas the Kind
:c*:DBka::[img]http://i.imgur.com/wiiNx9N.png[/img]		;Karnon
:c*:DBkr::[img]http://i.imgur.com/9nPaTp4.png[/img]		;Krutzbeck
:c*:DBlb::[img]http://i.imgur.com/oNvYUTs.png[/img]		;Laurel of Bloodwood
:c*:DBleo::[img]http://i.imgur.com/SGAA1f5.png[/IMG]		;Leoric of the Book
:c*:DBli::[img]http://i.imgur.com/WdYVrhG.png[/img]		;Lindel			[imageid=3167406 original]
:c*:DBll::[img]http://i.imgur.com/iT0Ku87.png[/img]		;Logan Leshley
:c*:DBlh::[img]http://i.imgur.com/7UjTYoi.png[/img]		;Lord Hawthorne
:c*:DBly::[img]http://i.imgur.com/VhrieTG.png[/img]		;Lyssa
:c*:DBmt::[img]http://i.imgur.com/Dr2YhC7.png[/img]		;Master Thorn
:c*:DBmo::[img]http://i.imgur.com/kR6qbdL.png[/img]		;Mordrog
:c*:DBnb::[img]http://i.imgur.com/kcHCXHB.png[/img]		;Nanok of the Blade
:c*:DBnf::[img]http://i.imgur.com/YA288k2.png[/img]		;Nara the Fang
:c*:DBor::[img]http://i.imgur.com/ps2pU5p.png[/img]		;Okaluk and Rakash
:c*:DBof::[img]http://i.imgur.com/DBBYPfH.png[/img]		;One Fist
:c*:DBos::[img]http://i.imgur.com/nxt22oJ.png[/img]		;Orkell the Swift
:c*:DBpd::[img]http://i.imgur.com/YNdsZuj.png[/img]		;Pathfinder Durik
:c*:DBrl::[img]http://i.imgur.com/2ryoxyZ.png[/IMG]		;Ravaella Lightfoot
:c*:DBra::[img]http://i.imgur.com/dYsrs11.png[/img]		;Raythen
:c*:DBre::[img]http://i.imgur.com/vYpGJA0.png[/img]		;Rendiel
:c*:DBrw::[img]http://i.imgur.com/G0TY9Nj.png[/IMG]		;Reynhart the Worthy
:c*:DBrs::[img]http://i.imgur.com/TYzzEQU.png[/img]		;Roganna the Shade
:c*:DBrw::[img]http://i.imgur.com/E3jk3WM.png[/img]		;Ronan of the Wild
:c*:DBsa::[img]http://i.imgur.com/fWqP5Pj.png[/img]		;Sahla
:c*:DBsk::[img]http://i.imgur.com/NRF8MNk.png[/img]		;Seer Kel
:c*:DBse::[img]http://i.imgur.com/yUgFS8I.png[/img]		;Serena
:c*:DBsh::[img]http://i.imgur.com/PcjLPvU.png[/img]		;Shiver
:c*:DBsi::[img]http://i.imgur.com/IQn1i1w.png[/img]		;Silhouette
:c*:DBsv::[img]http://i.imgur.com/ibIGGwb.png[/img]		;Sir Valadir
:c*:DBst::[img]http://i.imgur.com/ZSTO8IL.png[/img]		;Steelhorns
:c*:DBsy::[img]http://i.imgur.com/nyh6Gwz.png[/img]		;Syndrael		[imageid=3167405 original]
:c*:DBtah::[img]http://i.imgur.com/GUNK3Sn.png[/img]		;Tahlia
:c*:DBtat::[img]http://i.imgur.com/FbBfQKX.png[/img]		;Tatianna
:c*:DBte::[img]http://i.imgur.com/yCbGZZF.png[/img]		;Tetherys
:c*:DBtm::[img]http://i.imgur.com/9mGI7VL.png[/img]		;Thaiden Mistpeak
:c*:DBtw::[img]http://i.imgur.com/sq06aJC.png[/img]		;Tinashi the Wanderer
:c*:DBtb::[img]http://i.imgur.com/ODY1B83.png[/img]		;Tomble Burrowell
:c*:DBts::[img]http://i.imgur.com/9mramsw.png[/img]		;Trenloe the Strong
:c*:DBug::[img]http://i.imgur.com/jGq5BOO.png[/img]		;Ulma Grimstone
:c*:DBvf::[img]http://i.imgur.com/xHCdwcR.png[/img]		;Vyrah The Falconer
:c*:DBwt::[img]http://i.imgur.com/NvnRXiJ.png[/img]		;Widow Tarha
:c*:DBz::[img]http://i.imgur.com/38PKD6e.png[/img]		;Zyla


;CK heroes
:*:banner_carthos::[ImageID=4037576 original]
:*:banner_landrec::[ImageID=4037577 original]
:*:banner_tobin::[ImageID=4037578 original]
:*:banner_scorpion::[ImageID=4037579 original]
:*:banner_kirga::[ImageID=4037580 original]
:*:banner_varikas::[ImageID=4037581 original]
:*:banner_laughin::[[ImageID=4037582 original]
:*:banner_hugo::[ImageID=4037583 original]
:*:banner_eliam::[ImageID=4037584 original]
:*:banner_aurim::[ImageID=4037585 original]
:*:banner_bogran:: [ImageID=4037586 original]
:*:banner_glyr::[ImageID=4037587 original]


;----------;
;--- Heroes -;
;----------;
:c*:DHalr::Alys Raine
:c*:DHanr::Andira Runehand
:c*:DHaw::Arvel Worldwalker
:c*:DHash::Ashrian
:c*:DHast::Astarra
:c*:DHag::Augur Grisom
:c*:DHau::Aurim					;CK
:c*:DHaa::Avric Albright
:c*:DHbs::Bogran the Shadow			;CK
:c*:DHbg::Brother Gherinn
:c*:DHbr::Brother Glyr				;CK execption
:c*:DHch::Challara
:c*:DHco::Corbin
:c*:DHdv::Dezra the Vile
:c*:DHem::Elder Mok
:c*:DHel::Eliam					;CK
:c*:DHgk::Grey Ker
:c*:DHgt::Grisban the thirsty
:c*:DHmq::High Mage Quellen
:c*:DHhg::Hugo the Glorious			;CK
:c*:DHi::Ispher
:c*:DHje::Jaes the Exile
:c*:DHjf::Jain Fairwood
:c*:DHjk::Jonas the Kind
:c*:DHka::Karnon
:c*:DHki::Kirga					;CK
:c*:DHkr::Krutzbeck
:c*:DHlw::Landrec the Wise			;CK
:c*:DHla::Laughin Buldar			;CK exception
:c*:DHlb::Laurel of Bloodwood
:c*:DHleo::Leoric of the Book			;execption
:c*:DHli::Lindel
:c*:DHll::Logan Leshley
:c*:DHlh::Lord Hawthorne
:c*:DHly::Lyssa
:c*:DHch::Mad Carthos				;CK
:c*:DHmt::Master Thorn
:c*:DHmo::Mordrog
:c*:DHnb::Nanok of the Blade
:c*:DHnf::Nara the Fang
:c*:DHor::Okaluk and Rakash
:c*:DHof::One Fist
:c*:DHos::Orkell the Swift
:c*:DHpd::Pathfinder Durik
:c*:DHrl::Ravaella Lightfoot
:c*:DHra::Raythen
:c*:DHrd::Red Scorpion				;CK exception
:c*:DHre::Rendiel
:c*:DHrw::Reynhart the Worthy
:c*:DHrs::Roganna the Shade
:c*:DHrw::Ronan of the Wild
:c*:DHsa::Sahla
:c*:DHsk::Seer Kel
:c*:DHse::Serena
:c*:DHsh::Shiver
:c*:DHsi::Silhouette
:c*:DHsv::Sir Valadir
:c*:DHst::Steelhorns
:c*:DHsy::Syndrael
:c*:DHtah::Tahlia
:c*:DHtat::Tatianna
:c*:DHte::Tetherys
:c*:DHtm::Thaiden Mistpeak
:c*:DHtw::Tinashi the Wanderer
:c*:DHtf::Tobin Farslayer			;CK
:c*:DHtb::Tomble Burrowell
:c*:DHts::Trenloe the Strong
:c*:DHug::Ulma Grimstone
:c*:DHvd::Varikas the Dead			;CK
:c*:DHvf::Vyrah The Falconer
:c*:DHwt::Widow Tarha
:c*:DHz::Zyla


;----------;
;--- Monsters -;
;----------;
:c*:DMa::Arachyura
:c*:DMbn::Bandit		;exception
:c*:DMbs::Bane Spider
:c*:DMbar::Barghest
:c*:DMbe::Beastman
:c*:DMba::Blood Ape
:c*:DMbo::Bone Horror
:c*:DMbr::Broodwalker
:c*:DMcad::Carrion Drake
:c*:DMcs::Cave Spider
:c*:DMcha::Changeling
:c*:DMcb::Chaos Beast
:c*:DMcrd::Crypt Dragon
:c*:DMcrh::Crow Hag
:c*:DMdp::Dark Priest
:c*:DMde::Deep Elf
:c*:DMdl::Demon Lord
:c*:DMel::Elemental
:c*:DMet::Ettin
:c*:DMfe::Ferrox
:c*:DMfi::Fire Imps
:c*:DMfm::Flesh Moulder
:c*:DMgi::Giant
:c*:DMga::Goblin Archer
:c*:DMgw::Goblin Witcher
:c*:DMgo::Golem
:c*:DMha::Harpy
:c*:DMhe::Hellhound
:c*:DMhs::Hybrid Sentinel
:c*:DMiw::Ice Wyrm
:c*:DMir::Ironbound
:c*:DMk::Kobold
:c*:DMlb::Lava Beetle
:c*:DMma::Manticore
:c*:DMmp::Marrow Priest
:c*:DMmed::Medusa
:c*:DMmer::Merriod
:c*:DMn::Naga
:c*:DMo::Ogre
:c*:DMpw::Plague Worm
:c*:DMrw::Rat Swarm
:c*:DMra::Razorwing
:c*:DMre::Reanimate
:c*:DMsh::Shade
:c*:DMsd::Shadow Dragon
:c*:DMsc::Shambling Colossus
:c*:DMsa::Skeleton Archer
:c*:DMso::Sorcerer
:c*:DMtd::The Dispossessed
:c*:DMtr::Troll
:c*:DMvr::Volucrix Reaver
:c*:DMwe::Wendigo
:c*:DMwr::Wraith
:c*:DMyh::Ynfernael Hulk
:c*:DMz::Zombie



;----------;
;--- Lieutenants -;
;----------;


:c*:DLai::Ardus IxErebus
:c*:DLar::Ariad
:c*:DLbz::Baron Zachareth
:c*:DLbe::Belthir
:c*:DLbo::Bolgoreth
:c*:DLgm::Gargan Mirklace
:c*:DLk::Kyndrithul
:c*:DLef::Lady Eliza Farrow
:c*:DLmf::Lord Merick Farrow
:c*:DLqa::Queen Ariad
:c*:DLra::Raythen
:c*:DLro::Rylan Olliven
:c*:DLse::Serena
:c*:DLaf::Sir Alric Farrow
:c*:DLsk::Skarn
:c*:DLsp::Splig
:c*:DLto::Tristayne Olliven
:c*:DLva::Valyndra
:c*:DLve::Verminous
:c*:DLz::Zarihell


;----------;
;--- Events -;
;----------;

:c:DE1::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/01.png[/IMG]		;base game(10)
:c:DE2::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/02.png[/IMG]
:c:DE3::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/03.png[/IMG]
:c:DE4::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/04.png[/IMG]
:c:DE5::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/05.png[/IMG]
:c:DE6::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/06.png[/IMG]
:c:DE7::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/07.png[/IMG]
:c:DE8::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/08.png[/IMG]
:c:DE9::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/09.png[/IMG]
:c:DE10::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/10.png[/IMG]
:c:DE11::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/11.png[/IMG]		;lair-of-the-wyrm(3)
:c:DE12::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/12.png[/IMG]
:c:DE13::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/13.png[/IMG]
:c:DE14::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/14.png[/IMG]		;labyrinth-of-ruin(8)
:c:DE15::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/15.png[/IMG]
:c:DE16::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/16.png[/IMG]
:c:DE17::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/17.png[/IMG]
:c:DE18::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/18.png[/IMG]
:c:DE19::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/19.png[/IMG]
:c:DE20::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/20.png[/IMG]
:c:DE21::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/21.png[/IMG]
:c:DE22::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/22.png[/IMG]		;the-trollfens (3)
:c:DE23::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/23.png[/IMG]
:c:DE24::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/24.png[/IMG]
:c:DE25::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/25.png[/IMG]		;mists-of-bilehall (5)
:c:DE26::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/26.png[/IMG]
:c:DE27::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/27.png[/IMG]
:c:DE28::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/28.png[/IMG]
:c:DE29::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/29.png[/IMG]
:c:DE30::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/30.png[/IMG]		;the-chains-that-rust(2)
:c:DE31::[IMG]https://sadgit-hl.github.io/D2eMap/images/travel_cards/31.png[/IMG]

;----------;
;--- Objects -;
;----------;
;ACT I


:c:DO101::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/archaic-scroll-sn.png[/InlineIMG] 
:c:DO102::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/barons-cloak-sn.png[/InlineIMG] 
:c:DO103::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/battle-tome-mb.png[/InlineIMG] 
:c:DO104::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/bearded-axe-lr.png[/InlineIMG] 
:c:DO105::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/belt-of-alchemy-tf.png[/InlineIMG] 
:c:DO106::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/belt-of-waterwalking-tf.png[/InlineIMG] 
:c:DO107::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/blessed-shield-mr.png[/InlineIMG] 
:c:DO108::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/bloodscript-ring-mb.png[/InlineIMG] 
:c:DO109::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/bloody-dagger-sn.png[/InlineIMG] 
:c:DO110::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/bone-blade-sn.png[/InlineIMG] 
:c:DO111::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/boots-of-iron-sn.png[/InlineIMG] 
:c:DO112::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/bow-of-bone-lr.png[/InlineIMG] 
:c:DO113::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/chainmail-bg.png[/InlineIMG] 
:c:DO114::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/city-guards-bow-sn.png[/InlineIMG] 
:c:DO115::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/cloak-of-mists-sn.png[/InlineIMG] 
:c:DO116::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/corpsebug-brooch-mb.png[/InlineIMG] 
:c:DO117::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/crossbow-bg.png[/InlineIMG] 
:c:DO118::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/deflecting-shield-tf.png[/InlineIMG] 
:c:DO119::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/dire-flail-tf.png[/InlineIMG] 
:c:DO120::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/elm-greatbow-bg.png[/InlineIMG] 
:c:DO121::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/elven-boots-lr.png[/InlineIMG] 
:c:DO122::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/flash-powder-lw.png[/InlineIMG] 
:c:DO123::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/guardian-axe-tf.png[/InlineIMG] 
:c:DO124::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/halberd-lw.png[/InlineIMG] 
:c:DO125::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/handbow-lw.png[/InlineIMG] 
:c:DO126::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/heavy-cloak-bg.png[/InlineIMG] 
:c:DO127::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/immolation-bg.png[/InlineIMG] 
:c:DO128::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/incendiary-arrows-sn.png[/InlineIMG] 
:c:DO129::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/iron-battleaxe-bg.png[/InlineIMG] 
:c:DO130::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/iron-shield-bg.png[/InlineIMG] 
:c:DO131::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/iron-shield-bg.png[/InlineIMG] 
:c:DO132::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/iron-spear-bg.png[/InlineIMG] 
:c:DO133::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/ironbound-rune-sn.png[/InlineIMG] 
:c:DO134::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/jeweled-mace-sn.png[/InlineIMG] 
:c:DO135::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/jinns-lamp-lr.png[/InlineIMG] 
:c:DO136::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/leather-armor-bg.png[/InlineIMG] 
:c:DO137::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/leather-armor-bg.png[/InlineIMG] 
:c:DO138::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/lifedrain-scepter-tf.png[/InlineIMG] 
:c:DO139::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/light-hammer-bg.png[/InlineIMG] 
:c:DO140::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/lucky-charm-bg.png[/InlineIMG] 
:c:DO141::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/mace-of-aver-lr.png[/InlineIMG] 
:c:DO142::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/magic-staff-bg.png[/InlineIMG] 
:c:DO143::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/magma-blast-lw.png[/InlineIMG] 
:c:DO144::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/mana-weave-bg.png[/InlineIMG] 
:c:DO145::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/mapstone-tf.png[/InlineIMG] 
:c:DO146::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/marsh-cloak-mb.png[/InlineIMG] 
:c:DO147::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/mistbane-mb.png[/InlineIMG] 
:c:DO148::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/phoenix-pendant-sn.png[/InlineIMG] 
:c:DO149::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/poisoned-blowgun-lr.png[/InlineIMG] 
:c:DO150::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/ring-of-power-bg.png[/InlineIMG] 
:c:DO151::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/rune-plate-lr.png[/InlineIMG] 
:c:DO152::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/scorpion-helm-bg.png[/InlineIMG] 
:c:DO153::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/serpent-dagger-lr.png[/InlineIMG] 
:c:DO154::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/shadow-bracers-mr.png[/InlineIMG] 
:c:DO155::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/shield-of-light-lr.png[/InlineIMG] 
:c:DO156::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/sling-bg.png[/InlineIMG] 
:c:DO157::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/soulbound-sword-mb.png[/InlineIMG] 
:c:DO158::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/soulstone-mb.png[/InlineIMG] 
:c:DO159::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/staff-of-greyhaven-mr.png[/InlineIMG] 
:c:DO150::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/steel-broadsword-bg.png[/InlineIMG] 
:c:DO161::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/sunburst-bg.png[/InlineIMG] 
:c:DO162::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/teleportation-rune-lr.png[/InlineIMG] 
:c:DO163::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/thiefs-vest-lr.png[/InlineIMG] 
:c:DO164::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/trident-tf.png[/InlineIMG] 
:c:DO165::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/undying-skull-mr.png[/InlineIMG] 
:c:DO166::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/white-wolf-cloak-mr.png[/InlineIMG] 
:c:DO167::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act1/witch-hazel-bow-mb.png[/InlineIMG] 


;Act II
:c:DO201::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/belt-of-strength-tf.png[/InlineIMG] 
:c:DO202::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/black-iron-helm-lr.png[/InlineIMG] 
:c:DO203::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/blasting-rune-tf.png[/InlineIMG] 
:c:DO204::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/blessed-armor-cr.png[/InlineIMG] 
:c:DO205::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/bloodthirsty-bracers-cr.png[/InlineIMG] 
:c:DO206::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/bone-wand-cr.png[/InlineIMG] 
:c:DO207::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/boomerang-tf.png[/InlineIMG] 
:c:DO208::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/bow-of-the-eclipse-lr.png[/InlineIMG] 
:c:DO209::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/bow-of-the-sky-lw.png[/InlineIMG] 
:c:DO210::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/cloak-of-deception-lr.png[/InlineIMG] 
:c:DO211::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/demonhide-leather-bg.png[/InlineIMG] 
:c:DO212::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/dragontooth-hammer-bg.png[/InlineIMG] 
:c:DO213::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/dwarven-firebomb-bg.png[/InlineIMG] 
:c:DO214::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/elven-cloak-bg.png[/InlineIMG] 
:c:DO215::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/fists-of-iron-cr.png[/InlineIMG] 
:c:DO216::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/glaive-tf.png[/InlineIMG] 
:c:DO217::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/golden-mask-sn.png[/InlineIMG] 
:c:DO218::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/grinding-axe-bg.png[/InlineIMG] 
:c:DO219::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/hammer-of-doom-mr.png[/InlineIMG] 
:c:DO220::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/heart-seeker-mr.png[/InlineIMG] 
:c:DO221::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/heavy-steel-shield-bg.png[/InlineIMG] 
:c:DO222::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/horned-shield-cr.png[/InlineIMG] 
:c:DO223::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/ice-storm-bg.png[/InlineIMG] 
:c:DO224::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/inscribed-robes-lw.png[/InlineIMG] 
:c:DO225::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/iron-bound-ring-bg.png[/InlineIMG] 
:c:DO226::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/iron-claws-lr.png[/InlineIMG] 
:c:DO227::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/ironbound-glaive-sn.png[/InlineIMG] 
:c:DO228::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/ironbound-shield-sn.png[/InlineIMG] 
:c:DO229::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/latari-longbow-bg.png[/InlineIMG] 
:c:DO230::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/lightning-javelin-cr.png[/InlineIMG] 
:c:DO231::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/lightning-strike-bg.png[/InlineIMG] 
:c:DO232::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/mace-of-kellos-bg.png[/InlineIMG] 
:c:DO233::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/mask-of-horrors-cr.png[/InlineIMG] 
:c:DO234::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/merciful-boots-lw.png[/InlineIMG] 
:c:DO235::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/nerekhall-plate-sn.png[/InlineIMG] 
:c:DO236::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/obsidian-greataxe-lr.png[/InlineIMG] 
:c:DO237::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/obsidian-scalemail-lr.png[/InlineIMG] 
:c:DO238::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/platemail-bg.png[/InlineIMG] 
:c:DO239::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/rage-blade-lr.png[/InlineIMG] 
:c:DO240::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/rat-tooth-dagger-sn.png[/InlineIMG] 
:c:DO241::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/repeating-crossbow-sn.png[/InlineIMG] 
:c:DO242::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/rune-of-blades-sn.png[/InlineIMG] 
:c:DO243::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/rune-of-fate-mr.png[/InlineIMG] 
:c:DO244::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/rune-of-misery-lr.png[/InlineIMG] 
:c:DO245::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/rune-touched-leather-cr.png[/InlineIMG] 
:c:DO246::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/sash-of-the-slayer-cr.png[/InlineIMG] 
:c:DO247::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/scalemail-lw.png[/InlineIMG] 
:c:DO248::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/shadow-tome-sn.png[/InlineIMG] 
:c:DO249::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/shroud-of-dusk-lr.png[/InlineIMG] 
:c:DO250::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/staff-of-kellos-lw.png[/InlineIMG] 
:c:DO251::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/staff-of-the-wild-lr.png[/InlineIMG] 
:c:DO252::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/star-of-kellos-sn.png[/InlineIMG] 
:c:DO253::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/steel-greatsword-bg.png[/InlineIMG] 
:c:DO254::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/stone-armor-tf.png[/InlineIMG] 
:c:DO255::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/tival-crystal-bg.png[/InlineIMG] 
:c:DO256::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/vestments-of-kellos-sn.png[/InlineIMG] 
:c:DO257::[InlineIMG]https://raw.githubusercontent.com/any2cards/d2e/master/images/shop-items/act2/winged-blade-mr.png[/InlineIMG] 


:c*:DTst::[b]Start of Turn[/b]
:c*:DTet::[b]End of Turn[/b]
:c*:DTer::[b]End of Round[/b]

:c*:DTri::Reinforcements : 

:c*:DTa::[b]Activating[/b]
:co:DTCb::[COLOR={#}0000FF]-Minion[/COLOR]
:co:DTCr::[COLOR={#}FF0000]-Master[/COLOR]
:c*:DT1l::(1[ImageID=2625359 original inline] Left)
:c*:DT2l::(2[ImageID=2625359 original inline] Left)
:c*:DT3l::(3[ImageID=2625359 original inline] Left)
:c*:DT4l::(4[ImageID=2625359 original inline] Left)
:c*:DT5l::(5[ImageID=2625359 original inline] Left)
:c*:DT6l::(6[ImageID=2625359 original inline] Left)



;----------;
;---Nerrekhall Specific-;
;----------;
;***Objects***;

;***Skills***;

