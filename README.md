# Rage Assistant
Faeria is a collectible card game and as with all card games you are always the unluckiest person alive. But just saying
 "I'm so unlucky" isn't always enough. Rage Assistant will give you hard numbers in how many games out of a thousand you
 would have drawn your desired card(s) or combination of cards. 
 
 It can also tell you in how many games your desired
 ping outcome would have occurred where you can set the amount of pings and creatures on board.

This is an older project that I redid with React to get a feel for it. It's made with Typescript, React 
and Redux for handling state.
## TODO
* Time calculation and 
* Expand draw algorithm to account for mulligan
* Restructure reducers. Since the calculate reducer needs to access the entire state for calculations it might need
to be a parent reducer to all other reducers, I'm not sure. Right not it uses getState() to access entire state
which makes testing the reducer difficult for some reason, mocking the state doesn't seem to work for that.
* Re-add screen effects like in old project