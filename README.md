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
<ul>
  <li><h2>Normal Movement</h2></li>
      <img width="500" src="http://mouse-movement.liammahoney.me/general-mouse-detection.png">
      <p>A normal movement situation is anytime the box is NOT within 40 pixels of any border edge, and the user's mouse is within 100 pixels of the box.</p>
  <p>The program decides which movement(s) to make based on which box the user's mouse falls into.</p>

</ul>
  

        
