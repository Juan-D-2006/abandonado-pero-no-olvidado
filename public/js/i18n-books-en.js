// English translation of the books and 3D scenes. Spanish is the original (Supabase / data/hardware.json).
window.BOOKS_I18N = window.BOOKS_I18N || {};
window.SCENES_I18N = window.SCENES_I18N || {};
window.BOOKS_I18N.en = {
  "rover-lunar-lrv": {
    name: "Lunar Roving Vehicle (LRV)", mission: "Apollo 15, 16 and 17",
    arrived: "July 1971 (Apollo 15)", ended: "December 1972 (Apollo 17)",
    place: "Hadley-Apennine, Descartes and Taurus-Littrow",
    stats: [["Rovers on the Moon", "3"], ["Weight on Earth", "210 kg"], ["Apollo 17 drive", "35.7 km"]],
    story: "Imagine a car that travels folded up like a beach chair inside a spacecraft. That is how the Lunar Rover arrived: folded against the side of the landing module. The astronauts pulled on some straps and the car unfolded by itself. With it, the crews of Apollo 15, 16 and 17 could travel kilometers away from the landing site to look for ancient rocks. When each mission ended, the rover stayed parked on the Moon. There was no room to bring it back, so today there are three electric cars standing on the lunar surface.",
    science: "The rover used silver-zinc batteries that could not be recharged, and each wheel had its own electric motor. Its tires were not made of rubber: they were a mesh of steel wire with titanium plates, because rubber would have been damaged by the extreme cold and heat. Thanks to the long distances they drove, the astronauts collected samples from different terrains, including the famous “Genesis Rock” from Apollo 15, a piece of the oldest lunar crust.",
    today: "The three rovers are still where they were left, without power. NASA’s LRO spacecraft has photographed them from orbit, and the tracks of their wheels can still be seen in the pictures, because on the Moon there is no wind or rain to erase them.",
    fun: "On Apollo 17 a fender broke. The astronauts fixed it with duct tape and laminated maps. Also, the rover’s camera, controlled from Houston, filmed the spacecraft lifting off to go home: nobody was there to record it!"
  },
  "retrorreflectores-apollo": {
    name: "Laser retroreflectors", mission: "Apollo 11, 14 and 15",
    arrived: "July 21, 1969 (Apollo 11)", ended: "Still in use",
    place: "Sea of Tranquility, Fra Mauro and Hadley",
    stats: [["Apollo 15 prisms", "300"], ["Current precision", "millimeters"], ["Power needed", "none"]],
    story: "Of everything the astronauts left on the Moon, there is one object that still works every day, and it doesn’t even need electricity. It is a panel full of small glass prisms called a retroreflector. Neil Armstrong and Buzz Aldrin set up the first one in 1969. Later, Apollo 14 and Apollo 15 left two more. Since then, observatories on Earth fire laser beams at them and wait for the light to bounce back.",
    science: "A corner prism sends light back exactly the way it came. If we measure how long the laser takes to go and come back (about 2.5 seconds), we know the distance to the Moon with a precision of millimeters. That is how we discovered that the Moon moves about 3.8 centimeters farther from Earth every year. These measurements are also used to test Einstein’s theory of relativity.",
    today: "It is one of the few Apollo experiments still active. Of the trillions of photons that are sent, only a handful come back, so scientists need large telescopes and very sensitive detectors.",
    fun: "Retroreflectors work like the “cat’s eyes” on a bicycle or the reflective strips on a safety vest. The same idea, but 384,000 kilometers away!"
  },
  "eagle-etapa-descenso": {
    name: "Eagle descent stage", mission: "Apollo 11",
    arrived: "July 20, 1969", ended: "July 21, 1969",
    place: "Sea of Tranquility",
    stats: [["Total module mass", "15,103 kg"], ["Time on the surface", "21 h 36 min"], ["Rocks brought back", "21.55 kg"]],
    story: "The lunar module Eagle landed on July 20, 1969, in the Sea of Tranquility. It had two parts: the top part carried Neil Armstrong and Buzz Aldrin; the bottom part, with its golden legs, was the landing engine. Michael Collins waited for them in orbit. The astronauts walked about 250 meters, never going more than 100 m from the spacecraft. When they left, the top part lifted off using the bottom part as a launch pad, and the descent stage stayed on the Moon forever.",
    science: "The descent stage was 4.2 m wide and its footpads were 9.4 m apart. Its engine, with about 45,000 newtons of thrust, could speed up and slow down like a car’s pedal, which was essential for a gentle touchdown. The astronauts left the EASEP science package (48 kg, with solar panels), which worked until August 1969, and a laser mirror that is still used today.",
    today: "It is still in place, together with five other Apollo descent stages. The LRO spacecraft has photographed the site: you can make out the spacecraft and the paths of the footprints. The top part, however, stayed in orbit and nobody knows where it fell.",
    fun: "Next to the spacecraft they left the flag, objects in memory of explorers who had died, and a plaque on one leg that reads: “Here men from the planet Earth first set foot upon the Moon. July 1969 A.D. We came in peace for all mankind.”"
  },
  "falcon-apollo-15": {
    name: "Lunar module Falcon", mission: "Apollo 15",
    arrived: "July 30, 1971", ended: "August 2, 1971 (liftoff)",
    place: "Hadley-Apennine, Sea of Rains",
    stats: [["Time on the Moon", "66 h 55 min"], ["Distance by rover", "27.9 km"], ["Rocks brought back", "77.31 kg"]],
    story: "On July 30, 1971, David Scott and James Irwin landed the Falcon at the foot of the Apennine Mountains, while Alfred Worden waited for them in orbit. It was the first mission to carry a folded lunar car on board. On three outings that added up to 18 hours and 35 minutes, they drove 27.9 km: they visited the edge of Hadley Rille and the slopes of the mountains. They stayed almost three days on the Moon, longer than anyone before.",
    science: "They left an ALSEP station with seven instruments, including a seismometer, a magnetometer and a meter for the heat coming out of the Moon’s interior. Its power came from a SNAP-27 generator of about 70 watts, with about 4 kg of plutonium-238, and it worked until September 30, 1977. They brought back 77.31 kg of lunar rocks and soil.",
    today: "At Hadley you can still find the descent stage, the rover, the ALSEP station and a plaque. The top part of the spacecraft was released and crashed into the Moon on August 3, 1971, on purpose, so the seismometers could measure the shaking.",
    fun: "Scott dropped a hammer and a feather at the same time: they hit the ground together, because there is no air on the Moon! They also left a small figure in memory of 14 space explorers who had died."
  },
  "alsep-sismometros": {
    name: "ALSEP science stations", mission: "Apollo 12, 14, 15, 16 and 17",
    arrived: "November 1969 (Apollo 12)", ended: "September 30, 1977",
    place: "Five Apollo landing sites",
    stats: [["Stations", "5"], ["Years measuring", "almost 8"], ["Power source", "plutonium-238"]],
    story: "The astronauts could only stay a few days on the Moon, but they wanted to keep listening to it after they left. So they left behind small automatic laboratories called ALSEP. Each one had seismometers, heat meters, solar wind detectors and an antenna to send data to Earth. For almost eight years, these stations sent information without rest, until NASA switched them off in 1977.",
    science: "The seismometers discovered that the Moon has “moonquakes.” To study its interior, NASA deliberately crashed rocket parts into the surface. After one of those impacts, the Moon rang like a bell for about an hour. Those vibrations showed that the Moon has layers: a crust, a mantle and a core. The power came from a generator that turned the heat of plutonium into electricity.",
    today: "The stations are still on the Moon, switched off. Their data, however, are still being studied: today’s scientists analyze them with modern computers and find new moonquakes that went unnoticed before.",
    fun: "Apollo 11 carried a simpler version called EASEP. Its seismometer even recorded the footsteps of Armstrong and Aldrin walking nearby."
  },
  "surveyor-3": {
    mission: "Surveyor program",
    arrived: "April 20, 1967", ended: "May 1967",
    place: "Ocean of Storms",
    stats: [["Bounces on landing", "3"], ["Human visitors", "2"], ["Years of waiting", "2.5"]],
    story: "Before sending people, NASA needed to know whether the lunar ground could hold the weight of a spacecraft. To find out, it sent the Surveyor robots. Surveyor 3 had a bumpy landing: its engines did not shut off in time and it bounced three times before coming to rest. Even so, it worked, took thousands of photos and dug trenches with its arm. Two and a half years later it got an unexpected visit: the Apollo 12 astronauts landed about 180 meters away.",
    science: "Its mechanical scoop showed that the surface was firm, like packed wet sand, and that a crewed spacecraft would not sink. When Pete Conrad and Alan Bean visited Surveyor 3, they cut off its camera and other parts to bring them back to Earth. That let scientists study how the lunar environment affects materials after years of exposure.",
    today: "Most of the spacecraft is still in the Ocean of Storms. Its camera is in the Smithsonian’s National Air and Space Museum in Washington.",
    fun: "For years people said some Earth bacteria had survived inside the camera. Today it is believed it was contaminated when it was opened on Earth: a good lesson in why science always checks its results again."
  },
  "lcross": {
    arrived: "June 2009 (launch)", ended: "October 9, 2009",
    place: "Cabeus crater, lunar south pole",
    stats: [["Impacts", "2"], ["Time between crashes", "4 minutes"], ["Discovery", "water"]],
    story: "Some spacecraft end their mission by crashing... on purpose. LCROSS traveled to the Moon together with the upper stage of its rocket, called Centaur. Near the south pole, the two separated. First, the Centaur crashed into the dark floor of Cabeus crater and threw up a huge cloud of dust. LCROSS flew through that cloud, measuring everything it could, and four minutes later it crashed too.",
    science: "The floor of some polar craters never gets sunlight and is one of the coldest places in the solar system. Scientists suspected there might be hidden ice there. LCROSS’s instruments detected water in the cloud of material that was thrown up. It was key evidence that the Moon keeps ice at its poles.",
    today: "The remains of LCROSS and the Centaur lie in Cabeus crater. Their discovery now guides plans to explore the lunar south pole, where water could be used for drinking or for making fuel.",
    fun: "Many people gathered with telescopes to watch the crash, expecting a big flash... which could not be seen from Earth. What mattered was in the data, not in the show."
  },
  "lro": {
    arrived: "June 2009", ended: "Still in orbit",
    place: "Lunar orbit",
    stats: [["Years in orbit", "more than 17"], ["Launched with", "LCROSS"], ["Photos of Apollo sites", "all 6"]],
    story: "This spacecraft is not abandoned: it is the caretaker of everything others left behind. LRO reached the Moon in 2009 and since then it has been circling it, taking pictures and measuring its surface. Thanks to it we can see, from Earth, the Apollo modules, the parked rovers and even the paths made by the astronauts’ boots.",
    science: "LRO built the most detailed maps of the Moon that exist. Its camera can make out objects the size of a table, and other instruments measure the temperature of the ground and look for ice in craters. These maps are used to choose safe places for future crewed missions.",
    today: "It is still active after more than 17 years, far longer than planned. It is like a living archive: every new photo helps show how the surface changes and find new craters made by meteorites.",
    fun: "LRO photographed the places where other spacecraft crashed, like the twin GRAIL probes, and confirmed the exact spot of their impacts."
  },
  "viking-1": {
    mission: "Viking program",
    arrived: "July 20, 1976", ended: "November 1982",
    place: "Chryse Planitia",
    stats: [["Years working", "more than 6"], ["First color photos", "from the surface"], ["Life experiments", "3"]],
    story: "On July 20, 1976, exactly seven years after the first Moon landing, Viking 1 touched down on Mars. It was the first American spacecraft to work successfully on the Martian surface. It sent photos of a red landscape full of rocks under a butterscotch-colored sky. For more than six years it measured the Martian weather day after day, until a mistake in a command sent from Earth cut off communication in 1982.",
    science: "Viking carried a small laboratory to look for life: it scooped up soil with an arm, mixed it with nutrients and watched whether “something” breathed or ate. The results were confusing and most scientists concluded there was no life, but there was very strange soil chemistry. Those questions guided every Mars mission that came after.",
    today: "The spacecraft is still in Chryse Planitia, silent. It was renamed the “Thomas Mutch Memorial Station,” in honor of the leader of the imaging team.",
    fun: "Its twin, Viking 2, landed in another region and photographed frost covering the Martian ground in winter."
  },
  "sojourner-pathfinder": {
    name: "Sojourner and Pathfinder",
    arrived: "July 4, 1997", ended: "September 27, 1997",
    place: "Ares Vallis",
    stats: [["Rover weight", "10.6 kg"], ["Top speed", "1 cm/s"], ["Planned mission", "7 days"]],
    story: "Pathfinder arrived on Mars in a very fun way: wrapped in giant airbags, it bounced across the ground like a ball before stopping. When it opened, it let out Sojourner, a rover the size of a microwave oven. It was the first wheeled vehicle to drive on another planet. It was supposed to work for a week and it worked for almost three months, studying rocks the team named after cartoon characters.",
    science: "Sojourner had an instrument that analyzed what the rocks were made of. It found rounded rocks and pebbles like the ones rivers leave behind, signs that water once flowed through that region. The mission also proved that it was possible to land cheaply using airbags, an idea later used by Spirit and Opportunity.",
    today: "The Pathfinder lander, called the “Carl Sagan Memorial Station,” and little Sojourner are still in Ares Vallis, just a few meters from each other.",
    fun: "The name Sojourner was suggested by a 12-year-old girl, Valerie Ambroise, in a school contest. She chose it in honor of Sojourner Truth, a civil rights fighter."
  },
  "spirit": {
    arrived: "January 4, 2004", ended: "March 2010 (last contact)",
    place: "Gusev crater",
    stats: [["Planned mission", "90 days"], ["Lasted", "more than 6 years"], ["Distance driven", "7.7 km"]],
    story: "Spirit arrived on Mars for a three-month mission and kept working for more than six years. In 2006 one of its wheels jammed, so the team decided to drive it backward, dragging the broken wheel. In 2009 it got stuck in soft sand at a place called Troy. The engineers tried to free it for months, but the Martian winter arrived and Spirit stopped responding in March 2010.",
    science: "Its broken wheel turned out to be a big help: by dragging it, Spirit scraped the ground and uncovered a white material of almost pure silica. On Earth, that material forms in hot springs or volcanic steam, places where microbes love to live. So an accident became one of its greatest discoveries.",
    today: "Spirit is still stuck at Troy, covered in dust. Its mission was declared over in May 2011.",
    fun: "Spirit and its twin Opportunity were launched a month apart and landed on opposite sides of Mars."
  },
  "opportunity": {
    arrived: "January 25, 2004", ended: "June 2018 (last contact)",
    place: "Meridiani Planum",
    stats: [["Planned mission", "90 days"], ["Lasted", "more than 14 years"], ["Distance driven", "45 km"]],
    story: "Opportunity, “Oppy” to its friends, had a lucky landing: it bounced and ended up right inside a small crater, like a hole-in-one in golf. It was supposed to work for 90 days and stayed active for more than 14 years, traveling farther than a marathon. In June 2018 a dust storm covered the whole planet, blocked the sunlight, and its solar panels stopped charging.",
    science: "Opportunity found small spheres of a mineral called hematite, which the team nicknamed “blueberries.” On Earth, these spheres usually form with water. Together with other layered rocks, they were proof that Meridiani once had liquid water, perhaps salty and acidic.",
    today: "It rests in Perseverance Valley, on the rim of Endeavour crater. NASA sent more than a thousand calls before declaring the mission over in February 2019.",
    fun: "The phrase “My battery is low and it’s getting dark” became famous. It was not a literal message: it is a poetic translation of its last data made by a journalist."
  },
  "phoenix": {
    arrived: "May 25, 2008", ended: "November 2, 2008",
    place: "Vastitas Borealis, Martian Arctic",
    stats: [["Days working", "about 160"], ["Discovery", "water ice"], ["Books on board", "a whole DVD"]],
    story: "Phoenix went somewhere nobody had visited: the icy plains near the north pole of Mars. With its robotic arm it dug trenches in the ground and found bright white bits. A few days later those bits had disappeared. What happened? They were water ice that turned into vapor when exposed to the Sun. When the Martian winter came, Phoenix ran out of light and stopped communicating.",
    science: "Phoenix confirmed that there is water ice under the ground of the Martian Arctic. It also discovered perchlorate, a salt that can lower the temperature at which water freezes, and it watched snow falling from the clouds, although it evaporated before reaching the ground.",
    today: "Photos taken years later from orbit showed that its solar panels broke under the weight of the carbon dioxide ice that piled up on them during the winter.",
    fun: "Phoenix is a library on Mars! It carries a DVD called “Visions of Mars,” with novels, stories and art about the red planet, plus thousands of people’s names, meant for future explorers."
  },
  "insight": {
    arrived: "November 26, 2018", ended: "December 21, 2022",
    place: "Elysium Planitia",
    stats: [["Marsquakes detected", "1,319"], ["Largest quake", "magnitude 4.7"], ["Years listening", "4"]],
    story: "InSight did not come to look at the scenery: it came to listen to the heart of Mars. It set up a seismometer so sensitive that it could feel vibrations smaller than the width of an atom. Over four years it recorded more than a thousand “marsquakes.” But Martian dust slowly covered its solar panels, until it stopped responding in December 2022.",
    science: "The waves from marsquakes travel through the inside of the planet and change depending on what they pass through, just like an ultrasound scan. With them, scientists measured the thickness of Mars’s crust and discovered that its core is liquid and bigger than expected. InSight also had a drill, “the mole,” which could not bury itself because the soil kept clumping.",
    today: "InSight is still in Elysium Planitia, covered in dust. Its data are still used to understand how rocky planets form, including Earth.",
    fun: "InSight also detected meteorite impacts. Afterward, orbiting spacecraft photographed the freshly made craters, and some of them had uncovered ice!"
  },
  "ingenuity": {
    mission: "Mars 2020 (helicopter)",
    arrived: "February 18, 2021", ended: "January 18, 2024 (last flight)",
    place: "Valinor Hills, Jezero crater",
    stats: [["Flights (5 planned)", "72"], ["Time in the air", "128.8 min"], ["Distance flown", "17 km"]],
    story: "Ingenuity left Earth on July 30, 2020, hidden under the Perseverance rover, and reached Jezero crater on February 18, 2021. It was an experiment: it was supposed to make no more than five test flights in 30 days. On April 19, 2021, it lifted off and became the first machine to make a powered, controlled flight on another planet. In the end it flew 72 times in almost three years. Its last flight was on January 18, 2024.",
    science: "The air on Mars is less than 1% as dense as Earth’s. That is why, weighing only 1.8 kg, Ingenuity needed 1.2 m blades spinning at about 2,400 revolutions per minute. A solar panel charged its batteries. In total it flew 128.8 minutes and 17 km, climbed as high as 24 meters and reached 10 m/s. It also served as an aerial scout to guide the rover.",
    today: "NASA declared its mission over on January 25, 2024, when its blades were damaged. It no longer flies, but it is still on the dunes of Valinor Hills, set up to wake up and save data like a small test station.",
    fun: "On April 25, 2021, it took the first photo of the Perseverance rover from the air. And it carries a tiny piece of fabric from the Wright brothers’ Flyer, the first powered airplane on Earth."
  },
  "deposito-three-forks": {
    name: "Three Forks sample depot",
    arrived: "December 2022 to January 2023", ended: "Waiting",
    place: "Three Forks, Jezero crater",
    stats: [["Tubes left", "10"], ["Size of each tube", "like a marker pen"], ["Contents", "rock, soil and air"]],
    story: "Not everything left in space is abandoned: some things are stored. Between December 2022 and January 2023, the Perseverance rover carefully dropped ten metal tubes onto the floor of Jezero crater, at a place called Three Forks. Inside are pieces of rock, Martian dust and even a sample of the air. It is a kind of backup safe for the future.",
    science: "Billions of years ago, Jezero was a lake with a river delta. On Earth, rocks of that kind keep traces of ancient life. Analyzing them in labs on Earth, with equipment that is impossible to take to Mars, could answer the big question: was there ever life on Mars?",
    today: "The tubes are still lying in order on the ground, in a zigzag pattern so they are easy to find. How and when to bring them to Earth is still being discussed.",
    fun: "One of the tubes is a “witness tube”: it holds no rock, but helps tell whether the others could have been contaminated with materials carried from Earth."
  },
  "maven": {
    arrived: "September 21, 2014", ended: "December 2025 (last contact)",
    place: "Mars orbit",
    stats: [["Years in orbit", "11"], ["Key question", "where did the air go?"], ["End of mission", "2026"]],
    story: "A long time ago, Mars had thicker air and maybe rivers and lakes. Today it is a cold desert with a very thin atmosphere. MAVEN arrived in 2014 to solve the mystery: where did that air go? For eleven years it circled the planet measuring the gases escaping into space. In December 2025 it stopped communicating and, after months of attempts, NASA declared the mission over in 2026.",
    science: "MAVEN discovered that the solar wind, a stream of particles coming from the Sun, slowly strips away the atmosphere of Mars, especially during solar storms. Because Mars lost its protective magnetic field, it was left exposed. It also worked as an antenna, relaying messages from the rovers to Earth.",
    today: "MAVEN is still circling Mars, but silently. Its farewell left fewer spacecraft watching over the planet, which already has an aging fleet.",
    fun: "MAVEN carried a DVD with more than a thousand haikus about Mars, written and voted on by people from all over the world."
  },
  "voyager-1": {
    mission: "Voyager program",
    arrived: "September 5, 1977 (launch)", ended: "Still sending data",
    place: "Interstellar space",
    stats: [["Years traveling", "49"], ["Instruments on", "2 of 10"], ["Distance", "almost 1 light-day"]],
    story: "Voyager 1 is the human-made object that has traveled the farthest. It was launched in 1977, visited Jupiter and Saturn, and in 2012 it left the bubble the Sun creates around itself to enter interstellar space. Its signals take almost a whole day to reach Earth. To save power, the team has been switching off its instruments one by one: today only two are still on.",
    science: "Voyager 1 discovered active volcanoes on Io, a moon of Jupiter, and studied the atmosphere of Titan, Saturn’s large moon. Now it measures particles and magnetic fields in a region no other spacecraft had reached. It runs on a nuclear generator that loses about 4 watts of power every year.",
    today: "It is still alive almost 49 years after its launch. Every instrument switched off makes its life a little longer. One day its signal will stop arriving, but the spacecraft will keep traveling among the stars.",
    fun: "In 1990 it turned its camera around and photographed Earth from 6 billion km away: a “pale blue dot.” It also carries a golden record with greetings in 55 languages, music and sounds of our planet."
  },
  "voyager-2": {
    mission: "Voyager program",
    arrived: "August 20, 1977 (launch)", ended: "Still sending data",
    place: "Interstellar space",
    stats: [["Planets visited", "4"], ["Only visit to", "Uranus and Neptune"], ["Entered interstellar space", "2018"]],
    story: "Voyager 2 lifted off two weeks before its twin, but on a longer route. It took advantage of a planetary alignment that happens every 175 years to hop from one planet to the next like in a relay race. It flew past Jupiter, Saturn, Uranus and Neptune. To this day, it is the only spacecraft that has visited Uranus and Neptune. In 2018 it also crossed the border into interstellar space.",
    science: "It used the gravity of each planet like a slingshot to gain speed and change course, a technique called gravity assist. It discovered new moons and rings around Uranus and Neptune, and photographed a great dark spot on Neptune, a giant storm.",
    today: "Like Voyager 1, it is still sending data with very few instruments switched on, because its power is slowly running out. The team carefully decides what to turn off so that it lasts as long as possible.",
    fun: "It carries the same golden record as Voyager 1. On it are the sounds of rain, a heartbeat and a mother talking to her baby."
  },
  "pioneer-10": {
    mission: "Pioneer program",
    arrived: "March 2, 1972 (launch)", ended: "January 23, 2003 (last signal)",
    place: "Heading for the star Aldebaran",
    stats: [["Planned mission", "21 months"], ["Lasted", "more than 30 years"], ["Mass", "258 kg"]],
    story: "Pioneer 10 lifted off on March 2, 1972, from Cape Canaveral. Nobody knew whether a spacecraft could cross the asteroid belt without being destroyed. It entered the belt on July 15, 1972, crossed it safe and sound and, on December 4, 1973, passed 130,354 km from Jupiter. It was the first spacecraft to go beyond Mars, to visit Jupiter and to cross Neptune’s orbit (June 13, 1983). It was designed for 21 months… and it worked for more than 30 years.",
    science: "It took about 500 photos of Jupiter, where the Great Red Spot can be seen clearly, and the first close-up image of the moon Ganymede. It discovered that Jupiter’s radiation was much stronger than expected, vital information for protecting the Voyagers. It was powered by two SNAP-19 nuclear generators (about 140 watts at Jupiter): it was the first spacecraft with all-nuclear power.",
    today: "Its last signal arrived on January 23, 2003, from 12.23 billion km away: it took 11 hours and 20 minutes to get here! In 2017 it was about 118.8 times the Earth-Sun distance away. It travels silently toward the star Aldebaran, in Taurus, which it will pass in about two million years.",
    fun: "When it left Earth it reached 51,682 km/h, faster than any human-made object of its time. It carries an aluminum plaque with a man, a woman and a map of 14 pulsars that shows where the Sun is."
  },
  "pioneer-11": {
    mission: "Pioneer program",
    arrived: "April 6, 1973 (launch)", ended: "September 30, 1995 (last contact)",
    place: "Heading toward the constellation Sagittarius",
    stats: [["First to visit", "Saturn"], ["Photos of Saturn", "440"], ["Mass", "258.5 kg"]],
    story: "Pioneer 11 was the twin sister of Pioneer 10. It lifted off on April 6, 1973, and crossed the asteroid belt without a scratch. On December 3, 1974, it passed just 42,500 km from Jupiter’s clouds, three times closer than its sister, flying at 171,000 km/h. Then it used Jupiter’s gravity as a slingshot and, on September 1, 1979, became the first spacecraft to visit Saturn.",
    science: "It took the first photos of Jupiter’s poles and 440 images of the Saturn system. It discovered the F ring, a thin ring outside the main rings, and a small moon about 200 km across. It measured Saturn’s magnetic field for the first time and the temperature of Titan: 193 degrees below zero!",
    today: "On February 23, 1990, it crossed Neptune’s orbit. The last contact was on September 30, 1995, at 44.1 times the Earth-Sun distance. Today it travels silently toward the center of the galaxy, in the direction of Sagittarius, and will pass near the star Lambda Aquilae in almost four million years.",
    fun: "Just like Pioneer 10, it carries a golden plaque with a message for extraterrestrials. It was the idea of astronomer Carl Sagan: he wanted whoever found it to know who sent it and from where."
  },
  "new-horizons": {
    arrived: "January 19, 2006 (launch)", ended: "Still in the Kuiper belt",
    place: "Kuiper belt",
    stats: [["Visited Pluto", "2015"], ["Visited Arrokoth", "2019"], ["Launch speed", "record"]],
    story: "When New Horizons lifted off in 2006, Pluto was a blurry smudge in telescopes. It traveled for nine and a half years to get there. On July 14, 2015, it flew past Pluto and showed us an amazing world, with ice mountains and a big white “heart.” Then it continued to Arrokoth, an icy rock shaped like a snowman, the most distant object ever explored up close.",
    science: "It discovered that Pluto has nitrogen glaciers that flow slowly, mountains of water ice and a bluish atmosphere. Arrokoth showed how the first building blocks that formed the planets stuck together, more than 4.5 billion years ago.",
    today: "It is still active, traveling through the Kuiper belt and studying the dust and particles of that distant region of the solar system.",
    fun: "It carries a small portion of the ashes of Clyde Tombaugh, the astronomer who discovered Pluto in 1930."
  }
};
window.SCENES_I18N.en = {
  "spirit": [
    ["2004", "Spirit lands in Gusev crater and starts exploring. Its mission was supposed to last 90 days."],
    ["2006", "Its front right wheel jams. The team decides to drive it backward, dragging the wheel."],
    ["Discovery", "The dragged wheel scrapes the ground and uncovers white silica: a sign of ancient hot springs."],
    ["2009", "It gets stuck in the soft sand of Troy. Its wheels spin, but it no longer moves."],
    ["2010", "The Martian winter arrives. Spirit stops responding after more than 6 years."]
  ],
  "ingenuity": [
    ["2021", "Ingenuity travels hidden under the belly of the Perseverance rover."],
    ["Apr 19, 2021", "First powered flight on another planet: it rises 3 meters for 39 seconds."],
    ["Flight", "It was supposed to fly 5 times… flight no. {n}"],
    ["Jan 2024", "On flight 72 a blade breaks. Ingenuity rests at Valinor Hills, saving data."]
  ],
  "rover-lunar-lrv": [
    ["1971", "The rover travels folded next to the lunar module. The astronauts unfold it by pulling some straps."],
    ["Apollo 15-17", "With it they drive for kilometers looking for ancient rocks. On the Moon everything weighs six times less."],
    ["Farewell", "When they leave, they park it. Its camera, controlled from Earth, films the liftoff."],
    ["Today", "Three rovers are still there. With no wind or rain, their tracks never fade."]
  ],
  "retrorreflectores-apollo": [
    ["1969", "Armstrong and Aldrin place a panel with 100 glass prisms on the Moon."],
    ["From Earth", "An observatory fires a laser beam at the panel."],
    ["2.5 seconds", "The prisms send the light right back where it came from: there and back in 2.5 seconds."],
    ["Today", "Timing that trip showed the Moon moves 3.8 cm farther away every year. It still works!"]
  ],
  "voyager-1": [
    ["1977", "Voyager 1 leaves Earth heading for the giant planets."],
    ["1979", "It flies past Jupiter and discovers active volcanoes on its moon Io."],
    ["1980", "It visits Saturn and studies the atmosphere of Titan, its largest moon."],
    ["1990", "It turns its camera and photographs Earth: a “pale blue dot” 6 billion km away."],
    ["2012", "It crosses the Sun’s bubble and enters interstellar space."],
    ["Today", "Almost a light-day from home, only 2 of its 10 instruments are still on."]
  ],
  "new-horizons": [
    ["2006", "New Horizons lifts off: the fastest spacecraft launched from Earth up to that time."],
    ["2015", "After nine and a half years it reaches Pluto and discovers a huge icy “heart.”"],
    ["2019", "It visits Arrokoth, an icy rock shaped like a snowman."],
    ["Today", "It is still active, exploring the Kuiper belt at the edge of the solar system."]
  ]
};
