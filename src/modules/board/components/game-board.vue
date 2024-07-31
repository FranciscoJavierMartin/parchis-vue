<template>
  <div class="game-board" :class="boardColor">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { EBoardColors } from '@board/constants/board';

interface BoardProps {
  boardColor?: EBoardColors;
}

withDefaults(defineProps<BoardProps>(), {
  boardColor: EBoardColors.RGYB,
});
</script>

<style scoped>
/* stylelint-disable function-linear-gradient-no-nonstandard-direction */

.game-board {
  /* Background color for starter */
  --nest-grid-bg: white;
  --nest-grid-color: black;
  --nest-start-bg: #c4c3c2;
  --nest-bottom-left-bg: var(--game-red);
  --nest-top-left-bg: var(--game-green);
  --nest-top-right-bg: var(--game-yellow);
  --nest-bottom-right-bg: var(--game-blue);

  /* Initial main container size */
  --nest-size: calc(var(--size-tile) * 6);
  /* Circle size start point */
  --nest-size-circle: calc(var(--size-tile) * 3);
  /* Container color start point */
  --nest-container-bg: rgba(0, 0, 0, 0.3);
  /* Start point circle color */
  --nest-circle-bg: rgba(0, 0, 0, 0.5);
  --start-bg: white;
  /* Container size start point */
  --nest-size-container: calc(var(--size-tile) * 4.5);
  /* Container position */
  --nest-container-pos: calc(var(--size-tile) / 1.4);
  /* Circle position start point */
  --nest-circle-position-1-x: calc(var(--size-tile) / 2);
  --nest-circle-position-1-y: calc(var(--size-tile) / 2);

  --nest-circle-position-2-x: calc(calc(var(--size-tile) / 2) * 5);
  --nest-circle-position-2-y: calc(var(--size-tile) / 2);

  --nest-circle-position-3-x: calc(var(--size-tile) / 2);
  --nest-circle-position-3-y: calc(calc(var(--size-tile) / 2) * 5);

  --nest-circle-position-4-x: calc(calc(var(--size-tile) / 2) * 5);
  --nest-circle-position-4-y: calc(calc(var(--size-tile) / 2) * 5);
  /* Background size default values for circles */
  --nest-size-elements: var(--nest-size-circle) var(--nest-size-circle),
    var(--nest-size-circle) var(--nest-size-circle), var(--nest-size-circle) var(--nest-size-circle),
    var(--nest-size-circle) var(--nest-size-circle),
    var(--nest-size-container) var(--nest-size-container), var(--nest-size) var(--nest-size);

  /* Offset values for other starting points. */
  /* The origin (0, 0) is set as the top-left corner, and this value is used as 
    a reference point for calculating the positions of other elements by
     multiplying it as needed. */
  --nest-increase-position: calc(var(--size-tile) * 9);

  /* For the top-left departure point */
  --nest-top-left: radial-gradient(circle, var(--nest-circle-bg) 30%, rgba(0, 0, 0, 0) 0),
    radial-gradient(circle, var(--nest-circle-bg) 30%, rgba(0, 0, 0, 0) 0),
    radial-gradient(circle, var(--nest-circle-bg) 30%, rgba(0, 0, 0, 0) 0),
    radial-gradient(circle, var(--nest-circle-bg) 30%, rgba(0, 0, 0, 0) 0),
    linear-gradient(var(--nest-container-bg), var(--nest-container-bg)),
    linear-gradient(var(--nest-top-left-bg), var(--nest-top-left-bg));

  /* Value that is set in the background-position for each element's position */
  --nest-top-left-position: var(--nest-circle-position-1-x) var(--nest-circle-position-1-y),
    var(--nest-circle-position-2-x) var(--nest-circle-position-2-y),
    var(--nest-circle-position-3-x) var(--nest-circle-position-3-y),
    var(--nest-circle-position-4-x) var(--nest-circle-position-4-y),
    var(--nest-container-pos) var(--nest-container-pos), 0 0;

  /* For the top-right departure point */
  --nest-top-right: radial-gradient(circle, var(--nest-circle-bg) 30%, rgba(0, 0, 0, 0) 0),
    radial-gradient(circle, var(--nest-circle-bg) 30%, rgba(0, 0, 0, 0) 0),
    radial-gradient(circle, var(--nest-circle-bg) 30%, rgba(0, 0, 0, 0) 0),
    radial-gradient(circle, var(--nest-circle-bg) 30%, rgba(0, 0, 0, 0) 0),
    linear-gradient(var(--nest-container-bg), var(--nest-container-bg)),
    linear-gradient(var(--nest-top-right-bg), var(--nest-top-right-bg));

  --nest-top-right-position: calc(var(--nest-circle-position-1-x) + var(--nest-increase-position))
      var(--nest-circle-position-1-y),
    calc(var(--nest-circle-position-2-x) + var(--nest-increase-position))
      var(--nest-circle-position-2-y),
    calc(var(--nest-circle-position-3-x) + var(--nest-increase-position))
      var(--nest-circle-position-3-y),
    calc(var(--nest-circle-position-4-x) + var(--nest-increase-position))
      var(--nest-circle-position-4-y),
    calc(var(--nest-container-pos) + var(--nest-increase-position)) var(--nest-container-pos),
    var(--nest-increase-position) 0;

  /* For the bottom-left departure point */
  --nest-bottom-left: radial-gradient(circle, var(--nest-circle-bg) 30%, rgba(0, 0, 0, 0) 0),
    radial-gradient(circle, var(--nest-circle-bg) 30%, rgba(0, 0, 0, 0) 0),
    radial-gradient(circle, var(--nest-circle-bg) 30%, rgba(0, 0, 0, 0) 0),
    radial-gradient(circle, var(--nest-circle-bg) 30%, rgba(0, 0, 0, 0) 0),
    linear-gradient(var(--nest-container-bg), var(--nest-container-bg)),
    linear-gradient(var(--nest-bottom-left-bg), var(--nest-bottom-left-bg));

  --nest-bottom-left-position: var(--nest-circle-position-1-x)
      calc(var(--nest-circle-position-1-y) + var(--nest-increase-position)),
    var(--nest-circle-position-2-x)
      calc(var(--nest-circle-position-2-y) + var(--nest-increase-position)),
    var(--nest-circle-position-3-x)
      calc(var(--nest-circle-position-3-y) + var(--nest-increase-position)),
    var(--nest-circle-position-4-x)
      calc(var(--nest-circle-position-4-y) + var(--nest-increase-position)),
    var(--nest-container-pos) calc(var(--nest-container-pos) + var(--nest-increase-position)),
    0 var(--nest-increase-position);

  /* For the bottom-right departure point */
  --nest-bottom-right: radial-gradient(circle, var(--nest-circle-bg) 30%, rgba(0, 0, 0, 0) 0),
    radial-gradient(circle, var(--nest-circle-bg) 30%, rgba(0, 0, 0, 0) 0),
    radial-gradient(circle, var(--nest-circle-bg) 30%, rgba(0, 0, 0, 0) 0),
    radial-gradient(circle, var(--nest-circle-bg) 30%, rgba(0, 0, 0, 0) 0),
    linear-gradient(var(--nest-container-bg), var(--nest-container-bg)),
    linear-gradient(var(--nest-bottom-right-bg), var(--nest-bottom-right-bg));

  --nest-bottom-right-position: calc(
        var(--nest-circle-position-1-x) + var(--nest-increase-position)
      )
      calc(var(--nest-circle-position-1-y) + var(--nest-increase-position)),
    calc(var(--nest-circle-position-2-x) + var(--nest-increase-position))
      calc(var(--nest-circle-position-2-y) + var(--nest-increase-position)),
    calc(var(--nest-circle-position-3-x) + var(--nest-increase-position))
      calc(var(--nest-circle-position-3-y) + var(--nest-increase-position)),
    calc(var(--nest-circle-position-4-x) + var(--nest-increase-position))
      calc(var(--nest-circle-position-4-y) + var(--nest-increase-position)),
    calc(var(--nest-container-pos) + var(--nest-increase-position))
      calc(var(--nest-container-pos) + var(--nest-increase-position)),
    var(--nest-increase-position) var(--nest-increase-position);

  /* For the goal elements */
  /* Corresponds to the token targets */
  --finish-elements-size-value: calc(var(--size-tile) * 3);
  --finish-elements-size-value-half: calc(var(--finish-elements-size-value) / 2);

  --finish-elements-position-value: calc(var(--size-tile) * 6);

  --finish-elements-position-value-half: calc(
    var(--finish-elements-position-value) + var(--finish-elements-size-value-half)
  );

  /*
    The two first linear-gradients correspond to the bottom triangle, in this case, two triangles are created...
    The third linear-gradient corresponds to the left triangle
    The fourth linear-gradient is the top triangle
    And the last one corresponds to the right triangle
    */
  --finish-elements: linear-gradient(to left bottom, transparent 50%, var(--nest-bottom-left-bg) 0),
    linear-gradient(to right bottom, transparent 50%, var(--nest-bottom-left-bg) 0),
    linear-gradient(to left bottom, transparent 50%, var(--nest-top-left-bg) 0),
    linear-gradient(to right bottom, var(--nest-top-right-bg) 50%, transparent 0),
    linear-gradient(var(--nest-bottom-right-bg), var(--nest-bottom-right-bg));

  /*
    The value corresponding to the size of each triangle,
    Because for the first triangle, it's two, so it's established as half for each one,
    This value is always in pairs (width, height), so for the first one there are 4 values,
    For the others, there are two, so there are 10 values.
  */
  --finish-elements-size: var(--finish-elements-size-value-half)
      var(--finish-elements-size-value-half),
    var(--finish-elements-size-value-half) var(--finish-elements-size-value-half),
    var(--finish-elements-size-value) var(--finish-elements-size-value),
    var(--finish-elements-size-value) var(--finish-elements-size-value),
    var(--finish-elements-size-value) var(--finish-elements-size-value);

  /*
    For the position of the triangles, it's coordinates (x, y) in pixels,
    just like the size, there are 10 because the first triangle is a combination of triangles.
  */
  --finish-elements-position: var(--finish-elements-position-value-half)
      var(--finish-elements-position-value-half),
    var(--finish-elements-position-value) var(--finish-elements-position-value-half),
    var(--finish-elements-position-value) var(--finish-elements-position-value),
    var(--finish-elements-position-value) var(--finish-elements-position-value),
    var(--finish-elements-position-value) var(--finish-elements-position-value);

  /* For the final items upper */
  /*
    Items related to the exit cells, the first cell, has a different color in 
    this case, determined by a safe zone, the other colors depend on the board 
    rotation.
  */
  --finish-row-base: calc(var(--size-tile) * 7);
  --finish-row-top: linear-gradient(var(--nest-start-bg), var(--nest-start-bg)),
    linear-gradient(var(--nest-top-right-bg), var(--nest-top-right-bg)),
    linear-gradient(var(--nest-top-right-bg), var(--nest-top-right-bg)),
    linear-gradient(var(--nest-top-right-bg), var(--nest-top-right-bg)),
    linear-gradient(var(--nest-top-right-bg), var(--nest-top-right-bg)),
    linear-gradient(var(--nest-top-right-bg), var(--nest-top-right-bg));

  --finish-row-top-position: var(--finish-row-base) 0, var(--finish-row-base) var(--size-tile),
    var(--finish-row-base) calc(var(--size-tile) * 2),
    var(--finish-row-base) calc(var(--size-tile) * 3),
    var(--finish-row-base) calc(var(--size-tile) * 4),
    var(--finish-row-base) calc(var(--size-tile) * 5);

  /* For the exit cells of the left. */
  --finish-row-left: linear-gradient(var(--nest-start-bg), var(--nest-start-bg)),
    linear-gradient(var(--nest-top-left-bg), var(--nest-top-left-bg)),
    linear-gradient(var(--nest-top-left-bg), var(--nest-top-left-bg)),
    linear-gradient(var(--nest-top-left-bg), var(--nest-top-left-bg)),
    linear-gradient(var(--nest-top-left-bg), var(--nest-top-left-bg)),
    linear-gradient(var(--nest-top-left-bg), var(--nest-top-left-bg));

  --finish-row-left-position: 0 var(--finish-row-base), var(--size-tile) var(--finish-row-base),
    calc(var(--size-tile) * 2) var(--finish-row-base),
    calc(var(--size-tile) * 3) var(--finish-row-base),
    calc(var(--size-tile) * 4) var(--finish-row-base),
    calc(var(--size-tile) * 5) var(--finish-row-base);

  /* For the exit cells of the right. */
  --finish-row-right: linear-gradient(var(--nest-bottom-right-bg), var(--nest-bottom-right-bg)),
    linear-gradient(var(--nest-bottom-right-bg), var(--nest-bottom-right-bg)),
    linear-gradient(var(--nest-bottom-right-bg), var(--nest-bottom-right-bg)),
    linear-gradient(var(--nest-bottom-right-bg), var(--nest-bottom-right-bg)),
    linear-gradient(var(--nest-bottom-right-bg), var(--nest-bottom-right-bg)),
    linear-gradient(var(--nest-start-bg), var(--nest-start-bg));

  --finish-row-right-position: calc(var(--size-tile) * 9) var(--finish-row-base),
    calc(var(--size-tile) * 10) var(--finish-row-base),
    calc(var(--size-tile) * 11) var(--finish-row-base),
    calc(var(--size-tile) * 12) var(--finish-row-base),
    calc(var(--size-tile) * 13) var(--finish-row-base),
    calc(var(--size-tile) * 14) var(--finish-row-base);

  /* For the exit cells of the bottom. */
  --finish-bottom-right: linear-gradient(var(--nest-bottom-left-bg), var(--nest-bottom-left-bg)),
    linear-gradient(var(--nest-bottom-left-bg), var(--nest-bottom-left-bg)),
    linear-gradient(var(--nest-bottom-left-bg), var(--nest-bottom-left-bg)),
    linear-gradient(var(--nest-bottom-left-bg), var(--nest-bottom-left-bg)),
    linear-gradient(var(--nest-bottom-left-bg), var(--nest-bottom-left-bg)),
    linear-gradient(var(--nest-start-bg), var(--nest-start-bg));

  --finish-bottom-right-position: var(--finish-row-base) calc(var(--size-tile) * 9),
    var(--finish-row-base) calc(var(--size-tile) * 10),
    var(--finish-row-base) calc(var(--size-tile) * 11),
    var(--finish-row-base) calc(var(--size-tile) * 12),
    var(--finish-row-base) calc(var(--size-tile) * 13),
    var(--finish-row-base) calc(var(--size-tile) * 14);

  /* For the safe zones */
  /* Will show the cells that are safe. */
  --safe-points: linear-gradient(var(--nest-start-bg), var(--nest-start-bg)),
    linear-gradient(var(--nest-top-right-bg), var(--nest-top-right-bg)),
    linear-gradient(var(--nest-start-bg), var(--nest-start-bg)),
    linear-gradient(var(--nest-bottom-right-bg), var(--nest-bottom-right-bg)),
    linear-gradient(var(--nest-start-bg), var(--nest-start-bg)),
    linear-gradient(var(--nest-bottom-left-bg), var(--nest-bottom-left-bg)),
    linear-gradient(var(--nest-start-bg), var(--nest-start-bg)),
    linear-gradient(var(--nest-top-left-bg), var(--nest-top-left-bg));

  --safe-points-position: calc(var(--size-tile) * 6) calc(var(--size-tile) * 2),
    calc(var(--size-tile) * 8) var(--size-tile),
    calc(var(--size-tile) * 12) calc(var(--size-tile) * 6),
    calc(var(--size-tile) * 13) calc(var(--size-tile) * 8),
    calc(var(--size-tile) * 8) calc(var(--size-tile) * 12),
    calc(var(--size-tile) * 6) calc(var(--size-tile) * 13),
    calc(var(--size-tile) * 2) calc(var(--size-tile) * 8),
    var(--size-tile) calc(var(--size-tile) * 6);

  /* For the stars. */
  /* For creating the stars that will be displayed in the safe cells. */
  --start: linear-gradient(to left bottom, transparent 50%, var(--start-bg) 0),
    linear-gradient(to right bottom, transparent 50%, var(--start-bg) 0),
    linear-gradient(to left top, transparent 50%, var(--start-bg) 0),
    linear-gradient(to right top, transparent 50%, var(--start-bg) 0);

  --start-center-x-1: calc(var(--size-tile) * 0.46);
  --start-center-x-2: calc(var(--size-tile) * 0.16);

  --start-center-y-1: calc(var(--size-tile) * 0.2);
  --start-center-y-2: calc(var(--size-tile) * 0.35);

  --start-size-x: calc(var(--size-tile) * 0.3);
  --start-size-y: calc(var(--size-tile) * 0.4);

  --safe-stars-base-size: var(--start-size-x) var(--start-size-y),
    var(--start-size-x) var(--start-size-y), var(--start-size-x) var(--start-size-y),
    var(--start-size-x) var(--start-size-y);

  --safe-starts: var(--start), var(--start), var(--start), var(--start), var(--start), var(--start),
    var(--start), var(--start);

  /*
    There are a total of 12 stars for 12 safe cells, in this case, 
    the position is being calculated for each star.
  */
  --safe-starts-position-1: calc(calc(var(--size-tile) * 6) + var(--start-center-x-1))
      calc(calc(var(--size-tile) * 2) + var(--start-center-y-1)),
    calc(calc(var(--size-tile) * 6) + var(--start-center-x-2))
      calc(calc(var(--size-tile) * 2) + var(--start-center-y-1)),
    /* nuevos */ calc(calc(var(--size-tile) * 6) + var(--start-center-x-1))
      calc(calc(var(--size-tile) * 2) + var(--start-center-y-2)),
    calc(calc(var(--size-tile) * 6) + var(--start-center-x-2))
      calc(calc(var(--size-tile) * 2) + var(--start-center-y-2));

  --safe-starts-position-2: calc(calc(var(--size-tile) * 8) + var(--start-center-x-1))
      calc(calc(var(--size-tile) * 1) + var(--start-center-y-1)),
    calc(calc(var(--size-tile) * 8) + var(--start-center-x-2))
      calc(calc(var(--size-tile) * 1) + var(--start-center-y-1)),
    calc(calc(var(--size-tile) * 8) + var(--start-center-x-1))
      calc(calc(var(--size-tile) * 1) + var(--start-center-y-2)),
    calc(calc(var(--size-tile) * 8) + var(--start-center-x-2))
      calc(calc(var(--size-tile) * 1) + var(--start-center-y-2));

  --safe-starts-position-3: calc(calc(var(--size-tile) * 12) + var(--start-center-x-1))
      calc(calc(var(--size-tile) * 6) + var(--start-center-y-1)),
    calc(calc(var(--size-tile) * 12) + var(--start-center-x-2))
      calc(calc(var(--size-tile) * 6) + var(--start-center-y-1)),
    calc(calc(var(--size-tile) * 12) + var(--start-center-x-1))
      calc(calc(var(--size-tile) * 6) + var(--start-center-y-2)),
    calc(calc(var(--size-tile) * 12) + var(--start-center-x-2))
      calc(calc(var(--size-tile) * 6) + var(--start-center-y-2));

  --safe-starts-position-4: calc(calc(var(--size-tile) * 13) + var(--start-center-x-1))
      calc(calc(var(--size-tile) * 8) + var(--start-center-y-1)),
    calc(calc(var(--size-tile) * 13) + var(--start-center-x-2))
      calc(calc(var(--size-tile) * 8) + var(--start-center-y-1)),
    calc(calc(var(--size-tile) * 13) + var(--start-center-x-1))
      calc(calc(var(--size-tile) * 8) + var(--start-center-y-2)),
    calc(calc(var(--size-tile) * 13) + var(--start-center-x-2))
      calc(calc(var(--size-tile) * 8) + var(--start-center-y-2));

  --safe-starts-position-5: calc(calc(var(--size-tile) * 8) + var(--start-center-x-1))
      calc(calc(var(--size-tile) * 12) + var(--start-center-y-1)),
    calc(calc(var(--size-tile) * 8) + var(--start-center-x-2))
      calc(calc(var(--size-tile) * 12) + var(--start-center-y-1)),
    calc(calc(var(--size-tile) * 8) + var(--start-center-x-1))
      calc(calc(var(--size-tile) * 12) + var(--start-center-y-2)),
    calc(calc(var(--size-tile) * 8) + var(--start-center-x-2))
      calc(calc(var(--size-tile) * 12) + var(--start-center-y-2));

  --safe-starts-position-6: calc(calc(var(--size-tile) * 6) + var(--start-center-x-1))
      calc(calc(var(--size-tile) * 13) + var(--start-center-y-1)),
    calc(calc(var(--size-tile) * 6) + var(--start-center-x-2))
      calc(calc(var(--size-tile) * 13) + var(--start-center-y-1)),
    calc(calc(var(--size-tile) * 6) + var(--start-center-x-1))
      calc(calc(var(--size-tile) * 13) + var(--start-center-y-2)),
    calc(calc(var(--size-tile) * 6) + var(--start-center-x-2))
      calc(calc(var(--size-tile) * 13) + var(--start-center-y-2));

  --safe-starts-position-7: calc(calc(var(--size-tile) * 2) + var(--start-center-x-1))
      calc(calc(var(--size-tile) * 8) + var(--start-center-y-1)),
    calc(calc(var(--size-tile) * 2) + var(--start-center-x-2))
      calc(calc(var(--size-tile) * 8) + var(--start-center-y-1)),
    calc(calc(var(--size-tile) * 2) + var(--start-center-x-1))
      calc(calc(var(--size-tile) * 8) + var(--start-center-y-2)),
    calc(calc(var(--size-tile) * 2) + var(--start-center-x-2))
      calc(calc(var(--size-tile) * 8) + var(--start-center-y-2));

  --safe-starts-position-8: calc(calc(var(--size-tile) * 1) + var(--start-center-x-1))
      calc(calc(var(--size-tile) * 6) + var(--start-center-y-1)),
    calc(calc(var(--size-tile) * 1) + var(--start-center-x-2))
      calc(calc(var(--size-tile) * 6) + var(--start-center-y-1)),
    calc(calc(var(--size-tile) * 1) + var(--start-center-x-1))
      calc(calc(var(--size-tile) * 6) + var(--start-center-y-2)),
    calc(calc(var(--size-tile) * 1) + var(--start-center-x-2))
      calc(calc(var(--size-tile) * 6) + var(--start-center-y-2));

  --safe-starts-position: var(--safe-starts-position-1), var(--safe-starts-position-2),
    var(--safe-starts-position-3), var(--safe-starts-position-4), var(--safe-starts-position-5),
    var(--safe-starts-position-6), var(--safe-starts-position-7), var(--safe-starts-position-8);

  --safe-stars-size: var(--safe-stars-base-size), var(--safe-stars-base-size),
    var(--safe-stars-base-size), var(--safe-stars-base-size), var(--safe-stars-base-size),
    var(--safe-stars-base-size), var(--safe-stars-base-size), var(--safe-stars-base-size);
  position: relative;
  width: var(--size-board);
  height: var(--size-board);

  background-color: var(--nest-grid-bg);

  /* Show start tiles and safe tiles */
  background-image: var(--finish-row-top), var(--finish-row-left), var(--finish-row-right),
    var(--finish-bottom-right), var(--safe-points);

  background-repeat: no-repeat;

  background-position: var(--finish-row-top-position), var(--finish-row-left-position),
    var(--finish-row-right-position), var(--finish-bottom-right-position),
    var(--safe-points-position);

  background-size: var(--size-tile) var(--size-tile);
  border-radius: 10px;
  box-shadow:
    var(--nest-grid-color) 0px 0px 0px 3px,
    #be835d 0px 0px 0px 6px,
    rgb(255, 217, 19) 0px 0px 0px 9px;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background: repeating-linear-gradient(
        to right,
        transparent,
        transparent calc(var(--size-tile) - 1px),
        var(--nest-grid-color) calc(var(--size-tile) - 1px),
        var(--nest-grid-color) var(--size-tile)
      ),
      repeating-linear-gradient(
        to bottom,
        transparent,
        transparent calc(var(--size-tile) - 1px),
        var(--nest-grid-color) calc(var(--size-tile) - 1px),
        var(--nest-grid-color) var(--size-tile)
      );
    border-radius: 10px;
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';

    /*
    * Show four starter points
    * The four goals and the stars
    */
    background-image: var(--safe-starts), var(--finish-elements), var(--nest-top-left),
      var(--nest-top-right), var(--nest-bottom-left), var(--nest-bottom-right);

    background-repeat: no-repeat;

    background-position: var(--safe-starts-position), var(--finish-elements-position),
      var(--nest-top-left-position), var(--nest-top-right-position),
      var(--nest-bottom-left-position), var(--nest-bottom-right-position);

    background-size: var(--safe-stars-size), var(--finish-elements-size), var(--nest-size-elements),
      var(--nest-size-elements), var(--nest-size-elements), var(--nest-size-elements);
    border-radius: 10px;
  }

  /*
    Classes that change the colors of the board, rotating them.
    They start from the point of departure in the bottom, then follow the order of the right-bottom, right-top, and left-top.
    The default value of the board is:
    RBYG -> Red, Blue, Yellow, and Green, which is not necessary since the CSS variables already have those values initially
    The others are:

    * RGYB -> Rojo, verde, amarillo y azul, color por defecto...
    * BRGY -> Azul, Rojom verde y amarillo. *
    * YBRG -> Amarillo, azul, rojo y verde *
    * GYBR -> Verde, amarillo, azul y rojo...
  */
  &.BRGY {
    --nest-bottom-left-bg: var(--game-blue);
    --nest-top-left-bg: var(--game-red);
    --nest-top-right-bg: var(--game-green);
    --nest-bottom-right-bg: var(--game-yellow);
  }

  &.YBRG {
    --nest-bottom-left-bg: var(--game-yellow);
    --nest-top-left-bg: var(--game-blue);
    --nest-top-right-bg: var(--game-red);
    --nest-bottom-right-bg: var(--game-green);
  }

  &.GYBR {
    --nest-bottom-left-bg: var(--game-green);
    --nest-top-left-bg: var(--game-yellow);
    --nest-top-right-bg: var(--game-blue);
    --nest-bottom-right-bg: var(--game-red);
  }
}
</style>
