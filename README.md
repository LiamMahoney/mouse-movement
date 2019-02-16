# Mouse-Movement

Play here: <a href="https://mouse-movement.liammahoney.me/">liammahoney.me/mouse_movement/index.html</a><br>
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
<h2>Main Algorithm</h2>
The driver of this game is a function that determines where the user's cursor is relative to the box. If the cursor is within 100 pixels the box moves. Special cases are considered when the box is in a corner and when it is along the edge of the border. A hint of randomness is added to the box's movement to add an element of unpredictability to the movement.
  

        
