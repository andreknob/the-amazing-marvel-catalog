// eslint-disable-next-line import/no-extraneous-dependencies
import { fail, danger } from 'danger';

const consoleLogRegExp = /console\.log\(["|'|`].+["|'|`]\)/;

const checkChunks = (file: string, chunks: any[]) => {
  chunks.forEach((chunk) => {
    chunk.changes.forEach((change) => {
      if (change.add && consoleLogRegExp.test(change.content)) {
        fail(
          "There's a forgotten console.log, please remove it.",
          file,
          change.ln,
        );
      }
    });
  });
};

const checkConsoleLog = async () => {
  const diffsPromises = danger.git.created_files.map((createdFile) =>
    danger.git.structuredDiffForFile(createdFile),
  );

  const structuredDiffs = await Promise.all(diffsPromises);
  const diffs = structuredDiffs.map((diff, index) => ({
    file: danger.git.created_files[index],
    chunks: diff.chunks,
  }));

  diffs.forEach((diff: any) => {
    checkChunks(diff.file, diff.chunks);
  });
};

checkConsoleLog();
