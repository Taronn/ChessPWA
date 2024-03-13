import { Chess } from 'chess.js';
import { Chessboard2 } from '@chrisoakman/chessboard2/dist/chessboard2.min.mjs';
import { Color, GameType } from '../Shared/constants';
import { useEffect, useRef, useState } from 'react';
import { useSignalR } from '../../hooks/useSignalR';
import { f7 } from 'framework7-react';
import { PlayerInfoPanel } from './PlayerInfoPanel';

export function ChessBoard() {
  const size = Math.min(window.innerWidth - 45, window.innerHeight - 150);
  const { SignalRContext } = useSignalR();

  const player = {
    username: 'test',
    country: 'am',
    color: Color.WHITE,
    statistics: [
      {
        rating: 1500,
        type: GameType.RAPID,
      },
      {
        rating: 1500,
        type: GameType.BLITZ,
      },
      {
        rating: 1500,
        type: GameType.BULLET,
      },
    ],
  };

  const [chess, setChess] = useState({ game: new Chess() });
  const board = useRef<any>();
  let pgn;
  let pendingMove = null;

  SignalRContext.useSignalREffect('MakeMove', (from, to) => {
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
  }, [chess]);

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
    if (pgn) {
      chess.game.loadPgn(pgn);
      config.position = chess.game.fen();
      setChess({ ...chess });
    }
    f7.on('tabShow', () => board.current = Chessboard2('chessboard', config));
    return () => {
      f7.off('tabShow');
    };
  }, []);

  const onTouchSquare = (square, piece, boardInfo) =>
    onMousedownSquare({ square, piece });

  function onMousedownSquare({ square, piece }) {
    board.current.clearCircles();

    // do not pick up pieces if the game is over
    if (chess.game.isGameOver()) return false;

    if (player.color[0] !== chess.game.turn()) {
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
      <div style={{ width: size }} >
        <PlayerInfoPanel player={player} initialTime={10} isOpponent={true} />
        <div id="chessboard" className="display-block" style={{ width: size, height: size }}></div>
        <PlayerInfoPanel player={player} initialTime={10} />
      </div>
    </div>
  );
}