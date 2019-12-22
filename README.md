# Mouse-Movement

<a href="https://mouse-movement.liammahoney.dev/">Play here</a><br>
<a href="https://mouse-movement.liammahoney.dev/docs">Documentation</a><br>
<h2>Rules</h2>
<ul>
  <li>The objective of the game is to get your mouse cursor over the box, which is designed to avoid your cursor</li>
  <li>Your cursor cannot leave the black border around the page</li>
  <li>A higher score is a shorter time</li>
</ul>
<h2>Tech Stack</h2>
<ul>
  <li>JavaScript</li>
  <li>HTML/CSS</li>
  <li>Node.js</li>
  <ul>
    <li>express</li>
    <li>body-parser</li>
    <li>sqlite3</li>
  </ul>
</ul>
<h2>Box Moving Algorithm (GameEngine class)</h2>
<p>The program only considers moving the box if the user's mouse is within 100 pixels of the box. If it is, it determines which move to make.</p>
<p>The program considers two major cases with respect to the user's mouse and the box when deciding what direction to move the box.</p> 
<h4>Normal Case</h4>
<img width="500" src="http://mouse-movement.liammahoney.dev/general-mouse-detection.png">
<p>A normal case is anytime the box is NOT within 40 pixels of any border edge, and the user's mouse is within 100 pixels of the box.</p>
<p>The program decides which movement to make based on which box the user's mouse falls into. This is determined by extending the box's borders out 100 pixels and determining if the user's mouse falls within that.</p>
<p>The box will move in the opposite direction of the user's mouse. Additionally, there is an 80% chance of moving in directions perpindicular to the user's mouse. For example, if a user's mouse is in zone 8, there is a 40% chance the box will  move up and to the right, a 40% chance of the box will move down and to the right, and a 20% chance the box just moves right.</p>
<h4>Border Case</h4>
<p>A border movement situation is anytime part of the box is within 40 pixels of any border edge and the user's mouse is within 100 pixels of any edge of the box. There are two cases within a border movement case: a case when the box is within 40 pixels of <b>one</b> border, or when the box is within 40 pixels of <b>two</b> borders (a corner).</p>
<p>Both situations figure out where exactly the user's mouse is relative to the box by drawing a line through the box's opposing corners, and then determining whether the user's mouse is above or below that line. If the user's mouse is below that line it only moves in the opposite direciton. If the user's mouse is above that line, the box moves in the opposite direciton as well as the opposite direction of the border, attempting to move it away from the border as fast as possible.
<h6>General Border Case</h6>
<img width="700" src="https://mouse-movement.liammahoney.dev/border-situation.png">
<p>The program decides which direction to move the box when it's along a border by considering which zone the user's mouse is in. Here the program is prioritizing getting the box off of the border, as it's harder to catch the box in open space than along the border edge. </p>
<p>The user's mouse is detected by first figuring out which half of the box the mouse is on, and then extending a line through opposing corners towards the user's mouse. This line makes the program determine if it should move along the border, or attempt to push the box away from the border. For example, if the user's mouse is in zone 2 shown above, we only want the box to move right along the border. If it were to move down it may make it easier for the user to catch the box.</p>
<h6>Corner Case</h6>
<img width="700" src="https://mouse-movement.liammahoney.dev/corner-situation.png">
<p>A corner case is anytime the box is within 40 pixels of two borders and the user's mouse is within 100 pixels of the box.</p>
<p>The program decides what move to make by extending a line from the box's corners to determine if the user's mouse is above or below that line. Although similar to the general border case, a corner case only has two possible scenarios, and it prioritizes getting out of the corner by moving much faster out of the corner than in any other move. The thought here is that it would be easier to catch the box in a corner, so the box should get out of the corner as fast as possible.</p>
