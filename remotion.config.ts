import { Config } from '@remotion/cli/config';

Config.setOverwriteOutput(true);
Config.setConcurrency(4);
Config.setCodec('h264');
Config.setCrf(1);
Config.setVideoImageFormat('jpeg');
