import React from 'react';

/**
 * Logo
 *
 * @return {Component}
 */
const Logo = props => {
  const { fill } = props;

  return (
    <svg className="logo" viewBox="0 0 1319 148">
      <g>
        <g transform="translate(-77.000000, -537.000000)" fill={fill}>
          <path d="M174.06,607.66 C198.63,610.39 213.75,624.04 213.75,643.99 C213.75,667.3 194.43,682 163.35,682 L77.25,682 L77.25,661 L88.59,661 C93,661 95.1,658.9 95.1,654.49 L95.1,566.71 C95.1,562.3 93,560.2 88.59,560.2 L77.25,560.2 L77.25,539.2 L158.73,539.2 C189.81,539.2 209.13,552.85 209.13,574.48 C209.13,591.91 196.11,603.67 174.06,607.66 Z M148.23,560.2 L136.05,560.2 L136.05,597.58 L144.03,597.58 C159.36,597.58 169.23,590.02 169.23,578.05 C169.23,566.5 161.46,560.2 148.23,560.2 Z M136.05,661.21 L146.55,661.21 C163.56,661.21 173.85,654.07 173.85,640 C173.85,627.19 164.82,618.58 150.75,618.58 L136.05,618.58 L136.05,661.21 Z M378.5,661 L384.8,661 L384.8,682 L305.84,682 L305.84,661 L317.18,661 C321.17,661 323.27,658.27 321.8,654.7 L317.81,644.83 L268.04,644.83 L264.26,654.49 C262.79,658.06 264.47,661 268.67,661 L280.01,661 L280.01,682 L223.1,682 L223.1,661 L231.08,661 C235.91,661 239.27,658.69 241.16,653.86 L289.04,539.2 L318.44,539.2 L368.42,654.7 C370.31,658.9 373.67,661 378.5,661 Z M293.03,582.25 L275.18,626.98 L310.88,626.98 L293.03,582.25 Z M472.48,661.63 C491.17,661.63 503.98,648.61 511.33,622.78 L529.6,628.45 C523.09,665.41 499.57,684.1 465.34,684.1 C443.29,684.1 425.44,677.17 411.79,663.31 C398.35,649.24 391.63,631.81 391.63,610.81 C391.63,589.6 398.56,571.96 412.63,558.1 C426.7,544.03 444.76,537.1 466.81,537.1 C484.66,537.1 499.78,541.51 511.96,550.33 C524.35,559.15 530.44,569.44 530.44,581.2 C530.44,595.27 520.57,604.09 507.76,604.09 C495.16,604.09 485.92,595.27 485.92,583.51 C485.92,576.37 488.65,570.7 494.32,566.5 C489.49,559.78 482.14,556.42 472.27,556.42 C449.59,556.42 435.73,573.43 435.73,607.24 C435.73,641.68 449.17,661.63 472.48,661.63 Z M613.92,682 L543.15,682 L543.15,661 L554.49,661 C558.9,661 561,658.9 561,654.49 L561,566.71 C561,562.3 558.9,560.2 554.49,560.2 L543.15,560.2 L543.15,539.2 L618.75,539.2 L618.75,560.2 L608.46,560.2 C604.05,560.2 601.95,562.3 601.95,566.71 L601.95,654.49 C601.95,658.9 604.05,661 608.46,661 L613.92,661 L613.92,682 Z M706.95,682 L625.47,682 L625.47,661 L633.03,661 C637.44,661 638.07,658.9 635.13,654.7 L605.73,612.28 L650.04,566.29 C653.4,562.72 652.77,560.2 648.57,560.2 L634.5,560.2 L634.5,539.2 L703.59,539.2 L703.59,560.2 L696.24,560.2 C688.89,560.2 683.43,562.3 679.44,566.71 L646.26,601.99 L682.38,652.81 C686.37,658.27 691.62,661 698.55,661 L706.95,661 L706.95,682 Z M900.58,661 L909.4,661 L909.4,682 L848.29,682 L838.63,643.57 C835.9,632.44 828.55,626.77 816.79,626.77 L814.9,626.77 L814.9,654.49 C814.9,658.9 817,661 821.41,661 L829.6,661 L829.6,682 L756.1,682 L756.1,661 L767.44,661 C771.85,661 773.95,658.9 773.95,654.49 L773.95,566.71 C773.95,562.3 771.85,560.2 767.44,560.2 L756.1,560.2 L756.1,539.2 L840.1,539.2 C857.11,539.2 870.55,543.19 880.21,550.96 C889.87,558.73 894.7,568.39 894.7,579.52 C894.7,587.71 891.97,595.06 886.51,601.57 C875.59,614.38 861.31,620.47 848.92,621.31 C865.51,624.46 876.64,631.6 882.73,642.94 L889.03,654.7 C891.34,658.9 895.12,661 900.58,661 Z M814.9,605.77 L829.6,605.77 C843.04,605.77 852.7,596.32 852.7,582.25 C852.7,568.6 843.25,560.2 829.6,560.2 L814.9,560.2 L814.9,605.77 Z M934.71,557.89 C948.36,544.03 966.63,537.1 989.1,537.1 C1011.57,537.1 1029.84,544.03 1043.49,557.89 C1057.14,571.75 1064.07,589.39 1064.07,610.6 C1064.07,631.81 1057.14,649.45 1043.49,663.31 C1029.84,677.17 1011.57,684.1 989.1,684.1 C966.63,684.1 948.36,677.17 934.71,663.31 C921.06,649.45 914.13,631.81 914.13,610.6 C914.13,589.39 921.06,571.75 934.71,557.89 Z M966,650.92 C971.25,660.16 979.02,664.78 989.1,664.78 C999.18,664.78 1006.74,660.16 1011.99,650.92 C1017.24,641.47 1019.97,628.03 1019.97,610.6 C1019.97,593.17 1017.24,579.73 1011.99,570.49 C1006.74,561.04 999.18,556.42 989.1,556.42 C979.02,556.42 971.25,561.04 966,570.49 C960.75,579.73 958.23,593.17 958.23,610.6 C958.23,628.03 960.75,641.47 966,650.92 Z M1226.3,661 L1232.6,661 L1232.6,682 L1153.64,682 L1153.64,661 L1164.98,661 C1168.97,661 1171.07,658.27 1169.6,654.7 L1165.61,644.83 L1115.84,644.83 L1112.06,654.49 C1110.59,658.06 1112.27,661 1116.47,661 L1127.81,661 L1127.81,682 L1070.9,682 L1070.9,661 L1078.88,661 C1083.71,661 1087.07,658.69 1088.96,653.86 L1136.84,539.2 L1166.24,539.2 L1216.22,654.7 C1218.11,658.9 1221.47,661 1226.3,661 Z M1140.83,582.25 L1122.98,626.98 L1158.68,626.98 L1140.83,582.25 Z M1241.95,539.2 L1316.5,539.2 C1358.71,538.36 1396.3,568.39 1395.67,610.6 C1396.3,652.81 1358.71,682.84 1316.5,682 L1241.95,682 L1241.95,661 L1253.29,661 C1257.7,661 1259.8,658.9 1259.8,654.49 L1259.8,566.71 C1259.8,562.3 1257.7,560.2 1253.29,560.2 L1241.95,560.2 L1241.95,539.2 Z M1300.75,661 L1316.5,661 C1339.81,661 1351.57,644.2 1351.57,610.6 C1351.57,577 1339.81,560.2 1316.5,560.2 L1300.75,560.2 L1300.75,661 Z" />
        </g>
      </g>
    </svg>
  );
};

export default Logo;
