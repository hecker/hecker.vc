"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowIcon } from "components/icons";
import React, { useEffect, useState } from "react";

const errorMessages = [
  "Oh crumbs! Looks like you've wandered onto {slug}, a quiet little corner of the internet.",
  "Terribly sorry, but {slug} is about as real as my enthusiasm for Mondays.",
  "Oops, you've reached {slug}. Quite the detour, wasn’t it?",
  "Ah, {slug}... about as helpful as a screen door on a submarine.",
  "Blimey! {slug} doesn’t exist. Kind of like my work-life balance.",
  "Oh dear, {slug} seems to have taken a permanent holiday.",
  "Congrats! You've found {slug}, the internet's least exciting destination.",
  "Well, this is awkward... {slug} is as lost as I am without my morning tea.",
  "Ah, {slug}... as useful as a chocolate teapot.",
  "Sorry, but {slug} is about as real as unicorns in London.",
  "{slug}? Never heard of it. It's as mythical as British sunshine.",
  "Ah, {slug}. Gone faster than my paycheck on a Friday night.",
  "{slug} has vanished! Must’ve joined my will to go to the gym.",
  "{slug} is missing, like my motivation on a Monday morning.",
  "Uh-oh, {slug} isn't here. Much like my social skills at a party.",
  "{slug} is out of reach, like my dreams of being rich and famous.",
  "Bother, {slug} doesn't exist. Sort of like a stress-free day.",
  "Fancy that! {slug} disappeared faster than my New Year's resolutions.",
  "Oh, you've arrived at {slug}. It’s emptier than my fridge on a Sunday.",
  "Sorry, but {slug} is hiding better than my interest in small talk.",
  "No luck here! {slug} is as elusive as a good night's sleep.",
  "Oh dear, {slug} is gone! Bit like my dignity after a night out.",
  "Nope, no {slug} here. Just tumbleweeds and broken dreams.",
  "Oopsie, {slug} is missing. Likely in a better place… like the pub.",
  "Oh, {slug}? It's as lost as my willpower on a diet.",
  "{slug} vanished, probably tired of dealing with people like us.",
  "{slug}? It's about as real as a healthy work-life balance.",
  "Yikes, {slug} went missing faster than a British summer.",
  "Hmm, {slug} has vanished. Maybe it just couldn't handle the pressure.",
  "{slug} is gone, like the last slice of pizza when I'm hungry.",
  "Cor blimey! {slug} is as empty as my social calendar.",
  "Nope, {slug} isn’t here. It’s off pretending to be important.",
  "{slug} has departed. Probably off enjoying the quiet life.",
  "{slug}? Sorry, mate. It's ghosted you harder than my ex.",
  "Oh look, {slug} isn’t here, just like my free time.",
  "Cheers, you've reached {slug}. Or rather, you haven’t. It’s not here.",
  "No {slug} here. Just disappointment, much like British weather.",
  "{slug} has left the building… probably in search of a better web page.",
  "Blimey, {slug} disappeared! Took my sanity with it, I suppose.",
  "Looks like {slug} took a permanent vacation, lucky thing.",
  "{slug}? Nowhere to be found. Perhaps it joined a rock band.",
  "Bother, {slug} vanished quicker than my patience on the Tube.",
  "No luck! {slug} is about as real as my enthusiasm for Mondays.",
  "{slug} went missing. Probably off sipping tea somewhere.",
  "Oops, {slug} doesn’t exist. Much like my chances of winning the lottery.",
  "{slug} is as absent as the perfect cup of tea when you need it.",
  "Alas, {slug} has fled. Not a fan of commitment, I reckon.",
  "{slug} couldn’t be found, much like my motivation on a rainy day.",
  "{slug} has gone walkabout. It’s got better things to do.",
  "Sad to say, {slug} isn’t here. Possibly lost in time and space.",
  "{slug}? Ah, it’s taken a holiday… permanently.",
  "Oops! {slug} is gone, like my good sense on a Saturday night.",
  "{slug} has gone missing. Probably saw me coming and ran.",
  "{slug} doesn’t exist, like all my childhood dreams.",
  "Oh my! {slug} is missing, much like my will to adult today.",
  "Bad luck, {slug} left without leaving a note.",
  "Ah, {slug} is off on an adventure of its own, apparently.",
  "{slug} is as elusive as a full night’s sleep.",
  "{slug} went poof, like my diet the minute dessert arrives.",
  "Looks like {slug} has gone walkabout. Can you blame it?",
  "{slug}? Not found, just like my motivation to exercise.",
  "Well, {slug} has left us, like my self-discipline at a buffet.",
  "Fancy that! {slug} is off gallivanting. Some web pages have all the fun.",
  "Afraid {slug} is out of reach, like a stress-free day at work.",
  "Oops! {slug} is out of sight. Much like my savings account.",
  "{slug} couldn’t be found. Probably off to find itself.",
  "{slug} doesn’t exist, just like my good life decisions.",
  "Sorry, {slug} went poof. Probably saw us coming.",
  "Blimey! {slug} is lost, like my motivation on a Monday morning.",
  "{slug} is gone. Must’ve taken a page out of my sleep schedule.",
  "Whoops, {slug} went missing. Perhaps it’s off contemplating life.",
  "Alas, {slug} is out there somewhere… or not at all.",
  "{slug}? Nowhere to be seen. Bit like my exercise routine.",
  "{slug} is missing, probably in a better place than here.",
  "Well, {slug} is off hiding, like me at family gatherings.",
  "Crikey! {slug} has gone MIA. Off to find inner peace?",
  "{slug} is gone, much like my paycheck at the end of the month.",
  "Oops, {slug} has vanished! Quite like my plans to sleep early.",
  "Looks like {slug} went missing. It's probably having an existential crisis.",
  "Oh bother, {slug} isn’t here. It might be questioning reality.",
  "Whoops! {slug} has slipped into the digital ether.",
  "{slug} is out there somewhere, likely avoiding responsibilities.",
  "{slug}? Not here. Seems it’s got better things to do.",
  "No sign of {slug}. Probably escaped this madhouse.",
  "Afraid {slug} has skipped town, much like my patience today.",
  "{slug}? Nowhere to be found, like the Wi-Fi at my nan's house.",
  "Sorry, {slug} took off. Must be avoiding its responsibilities.",
  "Alas, {slug} has vanished. Maybe it just needed some space.",
  "{slug} is gone, like my optimism after reading the news.",
  "Nope, {slug} isn’t here. Took off faster than my last relationship.",
  "Ah, {slug}. Lost like my umbrella in a storm.",
  "{slug}? Lost in cyberspace. Some things just aren’t meant to be.",
  "Oh dear, {slug} has gone missing. Better luck next time.",
  "Oops, {slug} is as real as my motivation on a Monday morning.",
  "{slug} is missing! Must’ve had better places to be.",
  "Sad news, {slug} couldn’t be found. Perhaps it’s in Narnia.",
];

const NotFoundPage: React.FC = () => {
  const pathname = usePathname();
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const randomMessage =
      errorMessages[Math.floor(Math.random() * errorMessages.length)];
    setErrorMessage(randomMessage.replace("{slug}", pathname));
  }, [pathname]);

  return (
    <section className="flex flex-col items-center justify-center text-center">
      <h1 className="font-bold text-3xl font-serif mb-2">404</h1>
      <p className="my-5 max-w-[500px] text-neutral-800 dark:text-neutral-200 mb-4">
        {errorMessage}
      </p>
      <Link
        className="flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
        href="/"
      >
        <ArrowIcon />
        <p className="h-7">Back home</p>
      </Link>
    </section>
  );
};

export default NotFoundPage;
