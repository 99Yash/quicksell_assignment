import {
  AiFillCheckCircle,
  AiOutlineDash,
  AiOutlineClockCircle,
  AiOutlinePlus,
} from 'react-icons/ai';
import { BiCircle, BiSolidPieChartAlt } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { FiChevronDown } from 'react-icons/fi';
import { LuSettings2 } from 'react-icons/lu';
import { MdCancel } from 'react-icons/md';
import {
  PiCellSignalHighFill,
  PiCellSignalLowFill,
  PiCellSignalMediumFill,
} from 'react-icons/pi';
import { TbAlertSquareFilled } from 'react-icons/tb';
import { GiPapers } from 'react-icons/gi';

export const Icons = {
  urgent: TbAlertSquareFilled,
  check: AiFillCheckCircle,
  spinner: BiSolidPieChartAlt,
  down: FiChevronDown,
  more: BsThreeDots,
  dash: AiOutlineDash,
  settings: LuSettings2,
  add: AiOutlinePlus,
  cancel: MdCancel,
  circle: BiCircle,
  low: PiCellSignalLowFill,
  medium: PiCellSignalMediumFill,
  high: PiCellSignalHighFill,
  belloff: AiOutlineClockCircle,
};
