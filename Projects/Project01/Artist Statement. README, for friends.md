# Artist Statement - README, for friends
READ BEFORE TESTING PROGRAM

‘Jurassic Park Moment’ is an obvious homage to the great series Jurassic Park.
However, a bit of context is required in order to fully understand the concept behind this program.
In fact, ‘Jurassic Park Moment’ is not an officially recognized terminology (indeed, it has been a shocking discovery for me) but apparently a mere reference from my childhood. Just an idea crafted by a bunch of kids (my siblings and I) that identifies the first scene in the movie in which the protagonists see a/multiple dinosaur/s, matched with a specific, iconic soundtrack.
To best explain -or better yet demonstrate- what a ‘Jurassic Park Moment’ consists of, a homonym .mp4 file has been uploaded to the GitHub folder.
Enjoy!

IMPORTANT: for some reason GitHub and Atom don't see eye to eye and the program will be disproportionate in the GitHub pages. Please set the webpage zoom to 80% and then refresh the page.
PS. Small tip: do not hesitate to suggest ridiculous input to the program.


READ AFTER TESTING PROGRAM

The program is a silly homage to the first movie of the Jurassic Park series, specifically.
Not necessarily complex or impressive from a technical point of view, it was mostly an attempt to exploit to the maximum different libraries and adapt them to a foolish proposition of the iconic movie.
- ResponsiveVoice
     - robotic voice, perfectly fitting for program’s nature;
     - letting the user  c h o o s e  the dinosaur’s roar (we could make it say “I’m a dino mothafukka”;
        there is no need for me to explain the beauty of such potential);
     - making dino image files respond to dino call ( responsiveVoice.isPlaying() );
     - radio stations(feat. JSON).

-  JSON
      - radio stations (neatly storing data), sharing accurate, yet twisted, information.

- p5Sound (instead of ml5-Handpose Model)
actually, Handpose Model was intended to characterize the (previously called) “pet dino” state (currently ‘call dino’). It would have been the perfect reference to the original movie, in which “don’t move a muscle” became almost a catchphrase, for it was whispered each time a predator appeared.
The T-rex, notably, was (inaccurately) believed to base its vision on movement alone.
By lifting their hand towards the webcam, the user would “trigger” the dinosaur to attack.
And yet, the model kept crashing my program or slowing it down to a point where it became unpractical (1 frame every 4/5 sec). Unfortunately, this happened on multiple devices, so I opted to readjust the concept using the acoustic component of the p5 sound library. Specifically, the mic input. Indeed, I am ridiculously bitter about such development.

SIDE NOTES
- loadImageFiles() and loadSoundFiles() have been located at the very bottom of the program rather than right after the preload() for I thought it made the program
  quite busy and, after all, it isn't urgent to check those functions right away.

- I have made the choice (some  m a y  call it a mistake) to use a full screen canvas but also a restrict the "action" in a smaller frame, hence why defineBorders(). Not necessarily pretty, but functional (?).

- I sincerely hope you got the Camera Man as one of the obstacles. Another reference to the world of filmic production, of course. On that note, I decided to let the obstacles overlap, for it really fits the entire mood of the project(sometimes it'll look like a camera man hiding behind a rock. Genius).

- two cart263-related references may have caught the user’s eye. Indeed, those are a bobble-head-version of prof. Pippin and a list of questionable (but mostly out of context) quotes taken from the cart263 recorded lectures. I hope it was alright for me to play with these! Given the silly nature of the program, I thought it quite obvious the need not to take it seriously, although I’ll remove them if necessary.


CREDITS

- All visual media were designed by yours truly, except for the cat meme (of which I couldn’t find the original creator – how do you track back memes?) and splatter effect:
https://www.stickpng.com/img/people/blood/blood-splatter
- All Jurassic Park soundtracks are the original versions (personally edited – eg: trimmed, adjusted, filtered).
- Jurassic Park Theme Harmonica Meme:
https://youtu.be/-w-58hQ9dLk
-  All sound effects were taken from Freesound (opensource):
https://freesound.org/
