# Mouse-Movement

<a href="https://mouse-movement.liammahoney.me/">Play here</a><br>
<img src="https://liammahoney.me/pics/mouse-movement.gif">
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
<h2>Algorithm</h2>
The program considers two major cases with respect to the user's mouse and the box when deciding what direction to move the box. 
<h4>Normal case</h4>
<img width="500" src="http://mouse-movement.liammahoney.me/general-mouse-detection.png">
<p>A normal situation is anytime the box is NOT within 40 pixels of any border edge, and the user's mouse is within 100 pixels of the box.</p>
<p>The program decides which movement(s) to make based on which box the user's mouse falls into. This is determined by extending the box's borders out 100 pixels and determining if the user's mouse falls within that.</p>
<p>The box will move in the opposite direction of the user's mouse, as well as a 80% chance of moving in directions perpindicular to the user's mouse. For example, if a user's mouse is in zone 8, the box will move to the right, and there is a 40% chance of the box also moving up, and another 40% chance of the box also moving down.</p>
<h4>Border Movement</h4>
<p>A border movement situation is anytime any part of the box is within 40 pixels of any border edge. There are two cases within a border movement case: a case when the box is within 40 pixels of one border, or when the box is within 40 pixels of two boxes (a corner).</p>
<p>Both situations figure out where exactly the user's mouse is relative to the box by drawing a line through the box's opposing corners, and then determining whether the user's mouse is above or below that line. If the user's mouse is below that line it only moves in the opposite direciton. If the user's mouse is above that line, the box moves in the opposite direciton as well as the opposite direction of the border, attempting to move it away from the border as fast as possible.
<h6>General Border Case</h6>
<img width="700" src="https://mouse-movement.liammahoney.me/border-situation.png">


  

        
