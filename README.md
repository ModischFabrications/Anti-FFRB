# Anti-FFRB
Stop face focused repetitive behaviors (FFRB) by keeping your fingers away. 

Use my self-hosted version at [TODO](https://ffrb.modisch.me/).

[Body-focused repetitive behaviors (BFRBs)](https://www.webmd.com/mental-health/ss/slideshow-understanding-body-focused-repetitive-behavior) are better known under their common symptoms like nail biting, hair pulling, nose picking and more. 

This script should make it easier to combat these bad habits by supervising you through your webcam and alerting you whenever they happen. 

Synopsis: This script will warn you if your hand is in proximity to your face. 

Basic algorithm:
1. Check for face -> warn if missing
2. Save face position f_pos
3. Find and save hand position h_pos
4. Alert if f_pos ~= h_pos

## Deployment
TODO Cloudflare CDN, Github Actions & more 

## Dependencies
- [Svelte](https://svelte.dev/)
- [Handtrack.js](https://victordibia.com/handtrack.js)

## References
1. https://towardsdatascience.com/from-training-to-deployment-stop-biting-your-nails-with-machine-learning-ffed31a59040
2. https://realpython.com/face-detection-in-python-using-a-webcam/
3. https://github.com/shantnu/PyEng/blob/master/Image_Video/face_detect.py
4. https://stackoverflow.com/questions/62933930/how-do-i-access-my-local-webcam-while-my-python-script-is-running-on-a-server
5. https://github.com/ModischFabrications/AntiBite
6. https://blog.tensorflow.org/2019/11/handtrackjs-tracking-hand-interactions.html
7. https://github.com/krausest/js-framework-benchmark
8. https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-site/
9. https://github.com/fireship-io/10-javascript-frameworks/tree/main/svelte-app
10. https://medium.com/codingthesmartway-com-blog/building-a-svelte-3-todo-app-from-start-to-deployment-1737f72c23a6

## Design Decisions
### Language
I would have liked to use Go for an easy executable of this concept. 
Face detection is easy to get in any language, but it seems like webcam recordings [work better in Python](https://github.com/esimov/pigo#real-time-face-detection-running-as-a-shared-object).
Python is my go-to for simple tools. Deployment of Python code is a huge mess though. I can live with that for personal usage, but it's not how I envision this tool. 

Functionality on a website is just so much better to get this concept to the people that I need to try it.
WASM would be great for performant detection logic, but it's not worth the effort atm.

Cross-platform is also great, but my simple example app is fine to have a singular native (but multi-usable) platform for now. 

### Framework
No backend is needed, everything is offline. 

This app should be usable via browser though, so we need to have some kind of frontend. 

There are a lot of [comparisons](https://stackdiary.com/front-end-frameworks/) and [rankings](https://2021.stateofjs.com/en-US/libraries/front-end-frameworks), these are my verdicts:
- Vanilla HTML+CSS+JS is basic and surprisingly powerful, but with boilerplate
- Bootstrap et al. are useful for UI layout, but won't assist in logic
- React/Vue/Angular are top picked web frameworks
- Alpine can extend simpler markups with functionality
- Svelte/Solid/... are fancy framework newcomers that promise to do everything better

Use a big player if you want a job and a newcomer if you want to play.
I'm always down for new experiences, and I already used Vue, see [CutSolverFrontend](https://github.com/ModischFabrications/CutSolverFrontend), so a newcomer it is. 

A lot of these are great, but have varying use cases. Alpine sounds great, but seems better to future web-portfolio-works.
Solid uses Vite, a great build tool, and is even newer, but [lacks the community](https://www.libhunt.com/compare-ryansolid--solid-vs-svelte) yet.
While I don't need Reacts community I depend on examples, which makes the tiny differences between them less important.

[SvelteKit](https://kit.svelte.dev/) seems like a worthy addition for larger apps, but let's keep it simple for now. 

### Generic detection vs trained AI
[Tensorflow](https://www.tensorflow.org/js) could build a neuronal net to detect more complex patterns, but that would only work for my face. 
[Teachable Machine](https://teachablemachine.withgoogle.com/) is a great tool for people that skipped AI in their classes (me included). 

Ask some PhD for a cooler model or another AI-driven approach to detect more behaviors. 

Generic tracking libs:
- [MediaPipe](https://mediapipe.dev/): Powerful AIO cross-platform stream analysis solution from Google
- [Handtrack.js](https://victordibia.com/handtrack.js): Easy and simple, exact use case
- [Handsfree.js](https://handsfree.js.org/): Alternative with additional poses

Handtrack has a great demo and seems easy to use, so let's test that one for now.

### Deployment
Cloudflare CDN makes high performance usage of a static app much easier than delivering everything yourself. 
[Do this if you want to prevent a hug of death](https://noted.lol/noted-survived-top-3-on-hacker-news-how-did-it-effect-my-homelab/). 
Using its DNS might make integration easier, but I haven't gotten around to that yet. 

[Netlify](https://www.netlify.com/with/svelte/) supports Svelte natively and has a free tier, but seems to be limited.
[Vercel](https://vercel.com/guides/deploying-svelte-with-vercel) offers more for free hobby use though.

### Alerts
1. Screen flickering makes sense if you are sitting in front of it. Difficult to integrate though.
2. Sound warnings are jarring, but easier
3. Popups are annoying, but also boring

## Q & A
Q: Why build this?  
A: Ignoring bad habits is a bad habit of mine, let's see if a self-made solution helps.

Q: Privacy?
A: Nothing leaves your computer, everything is offline. Why would I pay server costs to capture hours of face-videos?


## Contributing
Feel free to contact me or make a pull-request if you want to participate.
Feedback is also welcome!
