module.exports = {
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
  button: {
    tiersel: {
      equal: '자신과 같은 티어로는 변경할 수 없습니다.',
      up: '승급을 진심으로 축하합니다. 🎉',
      down: '괜찮아요. 당신은 할 수 있어요. 👏',
    },
  },
  commands: {
    embeder: {
      notf: '`embed`가 존재하지 않습니다.',
      send: '{chn}채널로 전송되었습니다.',
      tiersel: {
        embed: {
          title: '티어 선택',
          image:
            'https://github.com/INIRU/Azite-Bot-2/blob/main/src/Image/role-select.png?raw=true',
          color: 0x212a3e,
          desc: '{bot}에게 자신의 **티어**를 알려주세요.',
          fields: [
            {
              name: '> ❗️**주의 사항**',
              value:
                '```자신의 티어를 허위로 알리는 경우 제재를 받을 수 있습니다.```\n\n성별 역할은 **“채널 및 역할”** 항목에 들어가면 선택 할 수 있습니다.',
            },
          ],
        },
      },
    },
  },
};
