import { Chess } from 'chess.js';
import { Chessboard2 } from '@chrisoakman/chessboard2/dist/chessboard2.min.mjs';
import { Color, Colors } from '../Shared/constants';
import { useEffect, useRef, useState } from 'react';
import { useSignalR } from '../../hooks/useSignalR';
import { f7 } from 'framework7-react';
import { PlayerInfoPanel } from './PlayerInfoPanel';
import { IGame, IPlayer } from '../Shared/types';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';

export function ChessBoard() {
  const size = Math.min(window.innerWidth - 45, window.innerHeight - 320);
  const { SignalRContext } = useSignalR();

  const [game, setGame] = useState<IGame>({} as IGame);
  const user = useSelector(selectUser);
  const [player, setPlayer] = useState<IPlayer>({} as IPlayer);
  const [opponent, setOpponent] = useState<IPlayer>({} as IPlayer);

  const [chess, setChess] = useState({ game: new Chess() });
  const board = useRef<any>();
  let pendingMove = null;

  SignalRContext.useSignalREffect(
    'SetGame',
    game => {
      console.log('game')
      console.log(game)
      const { whitePlayer, blackPlayer } = game;
      whitePlayer.color = Color.WHITE;
      blackPlayer.color = Color.BLACK;
      if (user.id === whitePlayer.id) {
        setPlayer(whitePlayer);
        setOpponent(blackPlayer);
      } else {
        setPlayer(blackPlayer);
        setOpponent(whitePlayer);
      }
      setGame({ ...game });
    },
    [],
  );

  SignalRContext.useSignalREffect(
    'MakeMove',
    (from, to) => {
      console.log('MakeMove', from, to);
      board.current.clearArrows();
      board.current.addArrow({
        color: 'orange',
        start: from,
        end: to,
        opacity: 50,
        size: 'small',
      });
      chess.game.move({ from: from, to: to, promotion: 'q' });
      board.current.position(chess.game.fen());
      setChess({ ...chess });
    },
    [chess],
  );

  useEffect(() => {
    f7.on('tabShow', () => {
      SignalRContext.invoke('GetGame');
    });
    return () => {
      f7.off('tabShow');
    };
  }, []);

  useEffect(() => {
    const config = {
      position: chess.game.fen(),
      orientation: player.color,
      touchMove: true,
      appearSpeed: 'slow',
      moveSpeed: 'slow',
      snapbackSpeed: 'slow',
      snapSpeed: 'slow',
      trashSpeed: 'slow',
      onMousedownSquare,
      onTouchSquare,
    };
    if (game?.pgn) {
      chess.game.loadPgn(game.pgn);
      config.position = chess.game.fen();
      setChess({ ...chess });
    }
    board.current = Chessboard2('chessboard', config);
  }, [game]);

  const onTouchSquare = (square, piece, boardInfo) => onMousedownSquare({ square, piece });

  function onMousedownSquare({ square, piece }) {
    board.current.clearCircles();

    // do not pick up pieces if the game is over
    if (chess.game.isGameOver()) return false;

    console.log(player);
    if (Colors[player.color][0] !== chess.game.turn()) {
      return false;
    }

    // get list of possible moves for this square
    const legalMoves = chess.game.moves({
      square,
      verbose: true,
    });

    legalMoves.forEach(move => {
      board.current.addCircle(move.to);
    });
    if (pendingMove && pendingMove === square) {
      board.current.clearCircles();
    }

    if (pendingMove && (!piece || piece[0] !== chess.game.turn())) {
      let move;

      try {
        move = chess.game.move({
          from: pendingMove,
          to: square,
          promotion: 'q', // always promote to a queen
        });
      } catch {
        move = null;
      }

      pendingMove = null;

      if (move) {
        SignalRContext.invoke('MakeMove', move.from, move.to);
        setChess({ ...chess });
        board.current.clearArrows();
        board.current.position(chess.game.fen());
      }
    } else if (piece && square !== pendingMove) {
      pendingMove = square;
    } else {
      pendingMove = null;
    }
  }

  return (
    <div className="display-flex justify-content-center margin-top">
      <div style={{ width: size }}>
        {opponent && <PlayerInfoPanel player={opponent} initialTime={game.initialTime} isOpponent={true} />}
        <div id="chessboard" className="display-block" style={{ width: size, height: size }}></div>
        {player && <PlayerInfoPanel player={player} initialTime={game.initialTime} />}
      </div>
    </div>
  );
}
