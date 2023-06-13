module.exports = {
  bot: {
    error: {
      user: {
        title: '⛔️ 알 수 없는 오류가 발생했습니다.',
        desc: '다음 정보를 개발자에게 전달해주시면 문제해결에 큰 도움이 됩니다.\n```js\n관리번호: {id}\n에러코드: {ename}\n메세지: {emsg}```',
      },
      developer: {
        title: '🔍 알 수 없는 오류를 발견하였습니다.',
        infomation: {
          name: '**Infomation**',
          value:
            '```js\nID: {id}\nUSER: {user}\nCHANNEL: {channel}\nGUILD: {guild}\nPERMISSIONS: {perms}```',
          inline: false,
        },
        error: {
          name: '**ERROR**',
          value: '```bash\n{error}```',
        },
      },
    },
  },
};
