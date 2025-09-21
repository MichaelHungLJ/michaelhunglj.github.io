---
layout: post
title: "LaunchedEffect"
date: 2025-08-15
tags: [Android]
---

**Today I Learnt: LaunchedEffect and the key to keys**

`LaunchedEffect` is a composable function that lets you launch coroutines tied to the composition lifecycle. The coroutine runs when the composable first enters composition, or when its **key(s)** change. The choice of key is important because it determines whether your effect runs once, or multiple times.

It’s commonly used for:
- **One-time side effects** (e.g. loading data when the screen first shows)
- **UI state–driven side effects** (e.g. sending tracking events when state changes)

&nbsp;

---
&nbsp;

#### The problem I encountered

I wanted to trigger tracking once when my `viewState` changed from `Loading` → `Content`.

```kotlin
sealed class ViewState {  
    object Loading : ViewState()    

    data class Content(  
        val header: HeaderUiModel,  
        val cardContent: CardUiModel,  
    ) : ViewState()  
}

LaunchedEffect(viewState) {
    when (viewState) {
        is ViewState.Content -> viewModel.callTracking()         
        else -> {}     
    } 
}
```

I expected it to run only once (on `Loading → Content`). But instead, it fired again whenever `Content` was re-emitted, even if the user was still on the same screen.

Why? Because `viewState` is a **new object each time it’s emitted** (data class equality might not hold, or the state flow is re-emitting). To `LaunchedEffect`, that means the viewState instance has changed and therefore the key has changed, which triggers a re-launch.

#### The fix

Instead of using the entire `viewState` as a key, I reduced it to a stable boolean:

```kotlin
val isViewStateContent = viewState is ViewState.Content  

LaunchedEffect(isViewStateContent) {    
    if (isViewStateContent) {       
        viewModel.callTracking()     
    } 
}
```

Now the key only flips once from `false → true`. Even if `Content` re-emits, the key stays `true`, so `LaunchedEffect` won’t get retriggered.


### Key takeaway

Be mindful of what you pass as a key to `LaunchedEffect`. If the key is too granular (like a state object that changes often), your effect may run more than expected. Reducing it to a simpler, stable value like a `Boolean` or an `ID` gives you finer control.