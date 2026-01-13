---
layout: post
title: "Tidy First - part 1"
date: 2026-01-06
tags: [Coding]
---

Like many “new year, new me” attempts, I decided to start the year by writing.
Not a full book summary, but a collection of moments where I caught myself thinking:

“Hmm… yes. This makes sense. I’ve felt this pain before.”
    
I’m currently reading <i>Tidy First by Kent Beck</i>. I haven’t finished the book yet, so instead of a single review, I’ll be adding notes as I go along.
These are reflections on ideas I relate with, things I’ve seen in real codebases, and lessons which hopefully I'll remember.

---

## Tidying

One important realization from Part 1 is that tidying is not exactly the same as refactoring. Refactoring is often associated with improving system design, while tidying focuses more on structure and clarity. Both aim to do this without changing existing behaviour, but tidying feels quieter and less visible. 
What really hit me is how unrewarding tidying 
feels in a company setting. 

    - It doesn’t improve KPIs
    - Doesn’t move business metrics
    - Rarely gets recognition
    - And honestly just feels like “extra work” that goes unseen.

 <br/>
Because of this, there’s very little incentive to tidy, and it quickly turns into a chore. Yet, we often spend far more time trying to understand messy code than actually implementing new features. In the short term, tidying doesn’t feel productive, but it directly reduces this hidden cost.

I do try to make an effort to tidy code whenever I can, but it can feel overwhelming. One piece of advice from the book, which also aligns with what I’ve heard from seniors, is to break large efforts into much smaller tasks. The goal is to make each change as simple as possible. Completing small, manageable steps helps build momentum and makes tidying feel far less daunting.

---

## Extracting Helpers

I've seen many classes and mappers packed with so much logic that understanding them becomes a painful experience. When there's too many responsibilities cramped in a single place, even small changes can feel risky. I've had experience with a god class, where no single engineer knows fully how it works and yet the god class was vital to other downstream logic. I dread making changes to it because it's difficult to understand the flows, test and I pray the tiniest change I make doesn't break everything apart.

SRP from SOLID principle teaches us that, ideally a class should only have 1 responsiblity. With complex mappers, we can should aim to breakdown the logic further into other helper functions and extract them out. This not only keeps it clean but also makes it easier to read, debug, and isolate it for testing. 

---

## Explaining comments

I feel that not many engineers actively advocate for writing comments. In the past, I tried to write my code logic as self-explanatory as possible so I could avoid adding them altogether (because some engineers don't like comments as it bloats the PR line or the codebase). While that approach still makes sense for explaining what the code does, I’ve come to realise that comments are often more valuable for explaining why something is done a certain way.

Sometimes code looks sub-optimal not because it’s poorly written, but because of historical constraints, service limitations, or business decisions made in the past. Without comments, future me or any new engineer joining the team has no way of knowing that context. <b> What seems obvious today quickly gets lost over time. </b>

With AI tools now, it’s also much easier to write comments that are concise and straightforward. This lowers the barrier to documenting intent and context, and removes some of the friction that previously made commenting feel like extra work.

