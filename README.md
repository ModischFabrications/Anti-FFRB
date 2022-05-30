## **WORK IN PROGRESS**


# Anti-FFRB

Stop face focused repetitive behaviors (FFRB) by keeping your fingers away. 

Use [my hosted version](https://ffrb.modisch.me/) or host your own.

Synopsis: This script will warn you if your hand is in proximity to your face. 

Basic algorithm:
```
1. Check for face -> warn if missing
2. Save face position f_pos
3. Find and save hand position h_pos
4. Alert if f_pos ~= h_pos
```

## Motivation
[Body-focused repetitive behaviors (BFRBs)](https://www.webmd.com/mental-health/ss/slideshow-understanding-body-focused-repetitive-behavior) are better known under their common symptoms like nail biting, hair pulling, nose picking and more. 

This script should make it easier to combat these bad habits by supervising you through your webcam and alerting you whenever they happen. 

## Installation
This is for development, use the website if you are a user!

Open a terminal and type:
```
npm install
npm run dev
```
Look at http://localhost:8080/ to see your build. 

Live updates are possible: Edit `./src/*` and save your changes, everything should be updated automatically. 

## Deployment
Prebuilds are kept out of this repo by design, can't assume they are always in sync.

### Github Actions
*Just do nothing.*  
The attached Github Action script creates and updates a branch with all files needed for the deployment. 
It's really that simple, can't believe it either. 

You do need to link your domain once for each new project:
1. Open your domain provider and add a CNAME record from your desired subdomain pointing to YOURNAME.github.io
2. Go to Github, open Settings/Pages 
    1. select the branch "gh-pages" to prepare deployment. 
    2. Add your custom domain with the subdomain prefix
4. Wait a while for DNS propagation (>10min)
5. Definitely wait for it because you will definitely get sceptical that something was wrong
6. Navigate to your domain with a fresh device to prevent cache errors
7. Enable HTTPS once everything is working

Yes, you can have multiple CNAMEs pointing to the same URL for YOURNAME.github.io. It's weird but it works, gh-pages manages everything. 

### Manual
Open a terminal and type:
```
npm run build
```
Copy `./public/` to your webhost of choice. 


## Dependencies
- [Svelte](https://svelte.dev/)
- [Svelte Material UI](https://sveltematerialui.com/)
- [Handtrack.js](https://victordibia.com/handtrack.js)

I'm also using https://counter.dev/ to track page visits without compromising any privacy with Google Analytics. 

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
11. https://svelte.dev/tutorial/basics
12. https://github.com/sveltejs/template
13. https://svelte.dev/blog/svelte-for-new-developers
14. https://deanattali.com/blog/multiple-github-pages-domains/
15. https://dev.to/danawoodman/svelte-quick-tip-connect-a-store-to-local-storage-4idi
16. https://fonts.google.com/icons

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

### UI Library
As I know now there are no generic UI components in Svelte (or any similar framework), so you need to choose something. Integration with the framework is nice, but optional. It should offer many components to prevent me from building ugly ones though. 

Generic CSS frameworks (No JS, looks only):
- Tailwind is the new, cool kid on the block, but barebones styling; lower than Bootstrap and very verbose
- [Bulma](https://bulma.io/) strong choice for ready-made components, biggest
- [DaisyUI](https://daisyui.com/) (45) abstract generic components based on Tailwind. Pretty!
- [Framework7](https://framework7.io/) also looks good, but Daisy looks better

Full Svelte integration (based on [other](https://medium.com/mkdir-awesome/8-popular-svelte-ui-components-d2a3e43d70c3) [lists](https://themeselection.com/svelte-ui-library)):
- [Carbon Components](https://carbon-components-svelte.onrender.com/) is a huge system with icons and more, styled by IBM. It makes me sad that it looks so bad :(
- [Svelte Material UI](https://sveltematerialui.com/) seems like the biggest (Material UI adaption) for Svelte with great integration
- [SvelteUI](https://www.svelteui.org/) promises perfect integration and quick turnaround, but is still in Beta and has few components(25c)
- [Sveltestrap](https://sveltestrap.js.org/) is Bootstrap in Svelte. 
- [Smelte](https://smeltejs.com/) uses Tailwind and Material look, but is still small
- [AgnosticUI](https://www.agnosticui.com/) promises bindings for all major platforms, still tiny though
- [Attractions](https://illright.github.io/attractions/) offers a bunch of components, but I don't like the look and it's tiny
- [Materialify](https://svelte-materialify.vercel.app/) is already deprecated
Others are too tiny or unstable to recommend. 

My final candidates were Svelte Material UI, Bulma and DaisyUI. Latter ones are more beautiful, the great integration of the former seems better for someone without any background though.
SMUI also contains simple Icons, provided by Material UI. Future work could use [Feather](https://feathericons.com/) and it's Svelte binding or even [Svelte Icons](https://svelte-icons.vercel.app/) as an all-in-one importer for everything. 

### Generic detection vs trained AI
[Tensorflow](https://www.tensorflow.org/js) could build a neuronal net to detect more complex patterns, but that would only work for my face. 
[Teachable Machine](https://teachablemachine.withgoogle.com/) is a great tool for people that skipped AI in their classes (me included). 

Ask some PhD for a cooler model or another AI-driven approach to detect more behaviors. 

Generic tracking libs:
- [MediaPipe](https://mediapipe.dev/): Powerful AIO cross-platform stream analysis solution from Google
- [Handtrack.js](https://victordibia.com/handtrack.js): Easy and simple, exact use case
- [Handsfree.js](https://handsfree.js.org/): Alternative with additional poses

Handtrack.js has a great demo and seems easy to use, so let's test that one for now.

### Deployment
Selfhosting is great if you know what you do, but that's not my case. 
Luckily there are a few free options for developers. 

There are [better](https://free-for.dev/#/?id=web-hosting) comparison [lists](https://github.com/255kb/stack-on-a-budget/blob/master/pages/static-app-hosting.md) than mine.

CDN makes high performance usage of a static app much easier than delivering everything yourself. 
[Do this if you want to prevent a hug of death](https://noted.lol/noted-survived-top-3-on-hacker-news-how-did-it-effect-my-homelab/). 

Svelte integration seems to be surprisingly simple because you only need to copy the build directory over. 
Using Github Actions makes sense, I don't want to keep updating everything manually. 

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
Feedback is very welcome!
