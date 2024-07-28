export class Sprite<T extends string> {
  private ctx: AudioContext;
  private audioBuffer: AudioBuffer;

  constructor(
    private src: string,
    private tracks: Record<T, number[]>,
  ) {
    this.ctx = new AudioContext();
    this.init();
  }

  public play(track: T): void {
    // const startTime: number = this.tracks[track][0] / 1000;
  }

  private async init(): Promise<void> {
    this.audioBuffer = await this.getFile();
  }

  private async getFile(): Promise<AudioBuffer> {
    const response = await fetch(this.src);

    if (!response.ok) {
      console.log(`${response.url} ${response.statusText}`);
      throw new Error(`${response.url} ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);

    return audioBuffer;
  }
}
